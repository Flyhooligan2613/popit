export type PostKind = "page" | "thought" | "reel" | "checkin";

export type SocialPost = {
  id: string;
  kind: PostKind;
  authorUsername: string;
  authorName: string;
  authorAccent: string;
  verified?: boolean;
  live?: boolean;
  text: string;
  title?: string;
  mediaHue?: string;
  venue?: string;
  city: string;
  createdAt: number;
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
  liked: boolean;
  saved: boolean;
  reposted: boolean;
  musicTrack?: string;
  following?: boolean;
};

export type StoryRing = {
  id: string;
  username: string;
  name: string;
  accent: string;
  verified?: boolean;
  viewed: boolean;
  isLive?: boolean;
  isOwn?: boolean;
  previewHue: string;
};

export type MessagePreview = {
  id: string;
  username: string;
  name: string;
  accent: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  fromMe: boolean;
  text: string;
  time: string;
  read?: boolean;
};

export type SocialNotification = {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "repost" | "live" | "story" | "invite" | "city";
  username: string;
  name: string;
  accent: string;
  text: string;
  time: string;
  read: boolean;
  postId?: string;
};

export type FeedTab = "foryou" | "following" | "reels" | "thoughts";

export type SearchTab = "people" | "posts" | "tags" | "places";

export type SocialState = {
  posts: SocialPost[];
  stories: StoryRing[];
  conversations: MessagePreview[];
  chatMessages: Record<string, ChatMessage[]>;
  notifications: SocialNotification[];
  following: string[];
};
