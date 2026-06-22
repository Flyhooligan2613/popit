const CLOSE_FRIENDS_KEY = "popit:closeFriends";
export const CLOSE_FRIENDS_UPDATE_EVENT = "popit:closeFriends:update";

export type CloseFriend = {
  username: string;
  name: string;
  addedAt: number;
};

function emitUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CLOSE_FRIENDS_UPDATE_EVENT));
  }
}

export function getCloseFriends(): CloseFriend[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLOSE_FRIENDS_KEY);
    return raw ? (JSON.parse(raw) as CloseFriend[]) : [];
  } catch {
    return [];
  }
}

export function saveCloseFriends(friends: CloseFriend[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLOSE_FRIENDS_KEY, JSON.stringify(friends));
  emitUpdate();
}

export function addCloseFriend(friend: Omit<CloseFriend, "addedAt">) {
  const normalized = friend.username.trim().toLowerCase();
  if (!normalized) return false;
  const current = getCloseFriends();
  if (current.some((f) => f.username.toLowerCase() === normalized)) return false;
  saveCloseFriends([{ ...friend, username: friend.username.trim(), addedAt: Date.now() }, ...current]);
  return true;
}

export function removeCloseFriend(username: string) {
  const normalized = username.trim().toLowerCase();
  saveCloseFriends(getCloseFriends().filter((f) => f.username.toLowerCase() !== normalized));
}

export function isCloseFriend(username: string): boolean {
  const normalized = username.trim().toLowerCase();
  return getCloseFriends().some((f) => f.username.toLowerCase() === normalized);
}
