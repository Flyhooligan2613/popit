import type { SocialState } from "./types";

/** Fresh platform defaults — no seeded fake users or posts. */
export const SEED_SOCIAL_STATE: SocialState = {
  following: [],
  postComments: {},
  stories: [
    {
      id: "s-own",
      username: "you",
      name: "Your Story",
      accent: "#A855F7",
      viewed: false,
      isOwn: true,
      previewHue: "#A855F7",
    },
  ],
  posts: [],
  conversations: [],
  chatMessages: {},
  notifications: [],
};
