export const CREATE_ROUTES = {
  live: "/broadcast",
  story: "/create/story",
  reel: "/create/reel",
  page: "/create/page",
} as const;

export type CreateMode = keyof typeof CREATE_ROUTES;

export function createModeRoute(mode: CreateMode): string {
  return CREATE_ROUTES[mode];
}
