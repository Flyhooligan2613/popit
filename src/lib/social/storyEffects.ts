export type StoryEffectId =
  | "none"
  | "pop-loop"
  | "city-bounce"
  | "reverse-pulse"
  | "neon-drift"
  | "city-rush"
  | "pop-burst"
  | "static-wave"
  | "prism-split"
  | "twin-lens"
  | "vapor-trail"
  | "night-strobe";

export type StoryEffect = {
  id: StoryEffectId;
  label: string;
  description: string;
  /** CSS animation class applied to preview */
  previewClass: string;
};

/** POP-branded story motion & loop effects (inspired by classic story tools) */
export const STORY_EFFECTS: StoryEffect[] = [
  { id: "none", label: "Clean", description: "No effect — raw city moment", previewClass: "" },
  { id: "pop-loop", label: "POP Loop", description: "Seamless forward-back loop", previewClass: "story-fx--pop-loop" },
  { id: "city-bounce", label: "City Bounce", description: "Elastic ping-pong motion", previewClass: "story-fx--city-bounce" },
  { id: "reverse-pulse", label: "Reverse Pulse", description: "Rewind then replay", previewClass: "story-fx--reverse-pulse" },
  { id: "neon-drift", label: "Neon Drift", description: "Slow-mo with light trails", previewClass: "story-fx--neon-drift" },
  { id: "city-rush", label: "City Rush", description: "Hyper-speed city blur", previewClass: "story-fx--city-rush" },
  { id: "pop-burst", label: "POP Burst", description: "Zoom punch on beat", previewClass: "story-fx--pop-burst" },
  { id: "static-wave", label: "Static Wave", description: "Glitch scan lines", previewClass: "story-fx--static-wave" },
  { id: "prism-split", label: "Prism Split", description: "Kaleidoscope mirror", previewClass: "story-fx--prism-split" },
  { id: "twin-lens", label: "Twin Lens", description: "Double exposure blend", previewClass: "story-fx--twin-lens" },
  { id: "vapor-trail", label: "Vapor Trail", description: "Soft echo fade", previewClass: "story-fx--vapor-trail" },
  { id: "night-strobe", label: "Night Strobe", description: "Club flash cuts", previewClass: "story-fx--night-strobe" },
];

export function storyEffectLabel(id: StoryEffectId): string {
  return STORY_EFFECTS.find((e) => e.id === id)?.label ?? "Clean";
}
