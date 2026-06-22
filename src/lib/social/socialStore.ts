import { SEED_SOCIAL_STATE } from "./seedData";
import type { PostKind, SocialPost, SocialState } from "./types";

const STORAGE_KEY = "popit:social:v1";
export const SOCIAL_UPDATE_EVENT = "popit:social:update";

function emitUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SOCIAL_UPDATE_EVENT));
  }
}

export function loadSocialState(): SocialState {
  if (typeof window === "undefined") return SEED_SOCIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SOCIAL_STATE));
      return SEED_SOCIAL_STATE;
    }
    return JSON.parse(raw) as SocialState;
  } catch {
    return SEED_SOCIAL_STATE;
  }
}

function saveSocialState(state: SocialState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  emitUpdate();
}

function mutate(fn: (state: SocialState) => SocialState) {
  const next = fn(loadSocialState());
  saveSocialState(next);
  return next;
}

export function togglePostLike(postId: string) {
  return mutate((state) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        : post
    ),
  }));
}

export function togglePostSave(postId: string) {
  return mutate((state) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            saved: !post.saved,
            saves: post.saved ? post.saves - 1 : post.saves + 1,
          }
        : post
    ),
  }));
}

export function togglePostRepost(postId: string) {
  return mutate((state) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            reposted: !post.reposted,
            reposts: post.reposted ? post.reposts - 1 : post.reposts + 1,
          }
        : post
    ),
  }));
}

export function toggleFollow(username: string) {
  return mutate((state) => {
    const isFollowing = state.following.includes(username);
    return {
      ...state,
      following: isFollowing
        ? state.following.filter((u) => u !== username)
        : [...state.following, username],
      posts: state.posts.map((post) =>
        post.authorUsername === username ? { ...post, following: !isFollowing } : post
      ),
    };
  });
}

export function markStoryViewed(storyId: string) {
  return mutate((state) => ({
    ...state,
    stories: state.stories.map((story) =>
      story.id === storyId ? { ...story, viewed: true } : story
    ),
  }));
}

export function markNotificationRead(notificationId: string) {
  return mutate((state) => ({
    ...state,
    notifications: state.notifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    ),
  }));
}

export function markAllNotificationsRead() {
  return mutate((state) => ({
    ...state,
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  }));
}

export function markConversationRead(conversationId: string) {
  return mutate((state) => ({
    ...state,
    conversations: state.conversations.map((c) =>
      c.id === conversationId ? { ...c, unread: 0 } : c
    ),
  }));
}

export function sendMessage(conversationId: string, text: string) {
  return mutate((state) => {
    const messages = state.chatMessages[conversationId] ?? [];
    const newMessage = {
      id: `m-${Date.now()}`,
      conversationId,
      fromMe: true,
      text,
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      read: true,
    };
    return {
      ...state,
      chatMessages: {
        ...state.chatMessages,
        [conversationId]: [...messages, newMessage],
      },
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, lastMessage: text, time: "now", unread: 0 }
          : c
      ),
    };
  });
}

type CreatePostInput = {
  kind: PostKind;
  text: string;
  title?: string;
  authorUsername: string;
  authorName: string;
  authorAccent: string;
  city?: string;
  venue?: string;
  musicTrack?: string;
};

export function createPost(input: CreatePostInput): SocialPost {
  const post: SocialPost = {
    id: `p-${Date.now()}`,
    kind: input.kind,
    authorUsername: input.authorUsername,
    authorName: input.authorName,
    authorAccent: input.authorAccent,
    text: input.text,
    title: input.title,
    venue: input.venue,
    city: input.city ?? "Miami",
    mediaHue: input.authorAccent,
    createdAt: Date.now(),
    likes: 0,
    comments: 0,
    reposts: 0,
    saves: 0,
    liked: false,
    saved: false,
    reposted: false,
    musicTrack: input.musicTrack,
    following: true,
  };

  mutate((state) => ({
    ...state,
    posts: [post, ...state.posts],
    notifications: [
      {
        id: `n-${Date.now()}`,
        type: input.kind === "thought" ? "mention" : "city",
        username: input.authorUsername,
        name: input.authorName,
        accent: input.authorAccent,
        text:
          input.kind === "thought"
            ? "posted a new thought to the city"
            : "shared a new city update",
        time: "now",
        read: true,
        postId: post.id,
      },
      ...state.notifications,
    ],
  }));

  return post;
}

export function getPostsForFeed(tab: "foryou" | "following" | "reels" | "thoughts"): SocialPost[] {
  const { posts, following } = loadSocialState();
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);

  if (tab === "following") {
    return sorted.filter((p) => following.includes(p.authorUsername) || p.following);
  }
  if (tab === "reels") {
    return sorted.filter((p) => p.kind === "reel");
  }
  if (tab === "thoughts") {
    return sorted.filter((p) => p.kind === "thought");
  }
  return sorted;
}

export function getPostsForUser(username: string): SocialPost[] {
  return loadSocialState()
    .posts.filter((p) => p.authorUsername === username)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getReels(): SocialPost[] {
  return getPostsForFeed("reels");
}

export function searchPosts(query: string): SocialPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return loadSocialState().posts.filter(
    (p) =>
      p.text.toLowerCase().includes(q) ||
      p.title?.toLowerCase().includes(q) ||
      p.authorName.toLowerCase().includes(q) ||
      p.venue?.toLowerCase().includes(q)
  );
}

export function unreadNotificationCount(): number {
  return loadSocialState().notifications.filter((n) => !n.read).length;
}

export function unreadMessageCount(): number {
  return loadSocialState().conversations.reduce((sum, c) => sum + c.unread, 0);
}

export function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
