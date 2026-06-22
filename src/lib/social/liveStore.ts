import type { StoryEffectId } from "./storyEffects";

export type StoryItem = {
  id: string;
  authorUsername: string;
  authorName: string;
  authorAccent: string;
  mediaId: string;
  mediaType: "image" | "video";
  effectId: StoryEffectId;
  caption?: string;
  musicTrack?: string;
  createdAt: number;
  expiresAt: number;
};

export type LiveComment = {
  id: string;
  username: string;
  name: string;
  text: string;
  createdAt: number;
};

export type LiveSession = {
  id: string;
  broadcasterUsername: string;
  broadcasterName: string;
  broadcasterAccent: string;
  title: string;
  city: string;
  startedAt: number;
  viewerCount: number;
  likeCount: number;
  musicTrack?: string;
  comments: LiveComment[];
};

export type LiveState = {
  activeSession: LiveSession | null;
  storyItems: StoryItem[];
};

const LIVE_KEY = "popit:live:v1";
export const LIVE_UPDATE_EVENT = "popit:live:update";

function emitUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(LIVE_UPDATE_EVENT));
  }
}

export function loadLiveState(): LiveState {
  if (typeof window === "undefined") {
    return { activeSession: null, storyItems: [] };
  }
  try {
    const raw = localStorage.getItem(LIVE_KEY);
    if (!raw) return { activeSession: null, storyItems: [] };
    return JSON.parse(raw) as LiveState;
  } catch {
    return { activeSession: null, storyItems: [] };
  }
}

function saveLiveState(state: LiveState) {
  localStorage.setItem(LIVE_KEY, JSON.stringify(state));
  emitUpdate();
}

function mutate(fn: (state: LiveState) => LiveState) {
  const next = fn(loadLiveState());
  saveLiveState(next);
  return next;
}

export function getActiveLiveSession(): LiveSession | null {
  const session = loadLiveState().activeSession;
  if (!session) return null;
  if (Date.now() - session.startedAt > 4 * 60 * 60 * 1000) {
    endLiveSession();
    return null;
  }
  return session;
}

export function startLiveSession(input: {
  broadcasterUsername: string;
  broadcasterName: string;
  broadcasterAccent: string;
  title: string;
  city: string;
  musicTrack?: string;
}): LiveSession {
  const session: LiveSession = {
    id: `live-${Date.now()}`,
    broadcasterUsername: input.broadcasterUsername,
    broadcasterName: input.broadcasterName,
    broadcasterAccent: input.broadcasterAccent,
    title: input.title,
    city: input.city,
    startedAt: Date.now(),
    viewerCount: 12 + Math.floor(Math.random() * 40),
    likeCount: 0,
    musicTrack: input.musicTrack,
    comments: [],
  };
  mutate(() => ({ ...loadLiveState(), activeSession: session }));
  return session;
}

export function endLiveSession() {
  mutate((state) => ({ ...state, activeSession: null }));
}

export function addLiveComment(sessionId: string, comment: Omit<LiveComment, "id" | "createdAt">) {
  mutate((state) => {
    if (!state.activeSession || state.activeSession.id !== sessionId) return state;
    const next: LiveComment = {
      id: `lc-${Date.now()}`,
      createdAt: Date.now(),
      ...comment,
    };
    return {
      ...state,
      activeSession: {
        ...state.activeSession,
        comments: [...state.activeSession.comments, next].slice(-80),
        viewerCount: state.activeSession.viewerCount + Math.floor(Math.random() * 3),
      },
    };
  });
}

export function bumpLiveEngagement(sessionId: string, likes = 1) {
  mutate((state) => {
    if (!state.activeSession || state.activeSession.id !== sessionId) return state;
    return {
      ...state,
      activeSession: {
        ...state.activeSession,
        likeCount: state.activeSession.likeCount + likes,
        viewerCount: state.activeSession.viewerCount + (Math.random() > 0.7 ? 1 : 0),
      },
    };
  });
}

export function simulateLiveActivity(sessionId: string) {
  const samples = [
    { username: "city_fan", name: "City Fan", text: "Just joined 👋" },
    { username: "local_legend", name: "Local Legend", text: "This is fire 🔥" },
    { username: "night_owl", name: "Night Owl", text: "Where is this??" },
    { username: "pop_crew", name: "POP Crew", text: "❤️❤️❤️" },
    { username: "venue_hop", name: "Venue Hop", text: "On my way!" },
  ];
  const pick = samples[Math.floor(Math.random() * samples.length)];
  addLiveComment(sessionId, pick);
  bumpLiveEngagement(sessionId, Math.floor(Math.random() * 5) + 1);
}

export function createStoryItem(input: {
  authorUsername: string;
  authorName: string;
  authorAccent: string;
  mediaId: string;
  mediaType: "image" | "video";
  effectId: StoryEffectId;
  caption?: string;
  musicTrack?: string;
}): StoryItem {
  const now = Date.now();
  const item: StoryItem = {
    id: `story-${now}`,
    authorUsername: input.authorUsername,
    authorName: input.authorName,
    authorAccent: input.authorAccent,
    mediaId: input.mediaId,
    mediaType: input.mediaType,
    effectId: input.effectId,
    caption: input.caption,
    musicTrack: input.musicTrack,
    createdAt: now,
    expiresAt: now + 24 * 60 * 60 * 1000,
  };

  mutate((state) => ({
    ...state,
    storyItems: [item, ...state.storyItems.filter((s) => s.expiresAt > now)].slice(0, 50),
  }));

  return item;
}

export function getStoryItemsForUser(username: string): StoryItem[] {
  const now = Date.now();
  return loadLiveState()
    .storyItems.filter(
      (s) => s.authorUsername.toLowerCase() === username.toLowerCase() && s.expiresAt > now
    )
    .sort((a, b) => a.createdAt - b.createdAt);
}

export function getAllActiveStories(): StoryItem[] {
  const now = Date.now();
  return loadLiveState()
    .storyItems.filter((s) => s.expiresAt > now)
    .sort((a, b) => b.createdAt - a.createdAt);
}


export function getWatchCommentsForSession(session: LiveSession | null): LiveComment[] {
  if (!session) return [];
  return session.comments.slice(-40);
}
