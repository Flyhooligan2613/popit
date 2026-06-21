import { getCareerLevel } from "./careerLevels";
import type { CityCareerLevelId, MonetizationChannel } from "./types";

export const MONETIZATION_CHANNELS: MonetizationChannel[] = [
  {
    id: "creator-bonus",
    label: "Creator Bonuses",
    description: "Earn when your content drives real city activity",
    minCareerLevel: "creator",
    icon: "✦",
  },
  {
    id: "live-gifts",
    label: "Live Gifts",
    description: "Receive support during live city broadcasts",
    minCareerLevel: "creator",
    icon: "🎁",
  },
  {
    id: "event-referrals",
    label: "Event Referrals",
    description: "Commission when your audience shows up",
    minCareerLevel: "city-creator",
    icon: "🎟",
  },
  {
    id: "restaurant-referrals",
    label: "Restaurant Referrals",
    description: "Rewarded when you influence dining visits",
    minCareerLevel: "contributor",
    icon: "🍽",
  },
  {
    id: "business-partnerships",
    label: "Business Partnerships",
    description: "Local brands collaborate with trusted creators",
    minCareerLevel: "elite-creator",
    icon: "🤝",
  },
  {
    id: "affiliate",
    label: "Affiliate Programs",
    description: "Share products your city actually uses",
    minCareerLevel: "city-creator",
    icon: "🔗",
  },
  {
    id: "ticket-commissions",
    label: "Ticket Commissions",
    description: "Earn on events you help fill",
    minCareerLevel: "elite-creator",
    icon: "🎫",
  },
  {
    id: "community-challenges",
    label: "Community Challenges",
    description: "Prize pools for positive city contributions",
    minCareerLevel: "contributor",
    icon: "🏆",
  },
  {
    id: "brand-collabs",
    label: "Brand Collaborations",
    description: "Paid campaigns with local businesses",
    minCareerLevel: "city-creator",
    icon: "📣",
  },
  {
    id: "premium-subscriptions",
    label: "Premium Subscriptions",
    description: "Offer exclusive access to your community",
    minCareerLevel: "elite-creator",
    icon: "⭐",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Sell digital and local experiences",
    minCareerLevel: "city-legend",
    icon: "🛍",
  },
  {
    id: "digital-products",
    label: "Digital Products",
    description: "Guides, presets, and city resources",
    minCareerLevel: "pop-legend",
    icon: "📦",
  },
];

const LEVEL_TIER: Record<CityCareerLevelId, number> = {
  explorer: 1,
  contributor: 2,
  creator: 3,
  "city-creator": 4,
  "elite-creator": 5,
  "city-legend": 6,
  "pop-legend": 7,
};

export function getEligibleChannels(careerLevelId: CityCareerLevelId): MonetizationChannel[] {
  const tier = LEVEL_TIER[careerLevelId];
  return MONETIZATION_CHANNELS.filter((c) => LEVEL_TIER[c.minCareerLevel] <= tier);
}

export function getUpcomingChannels(careerLevelId: CityCareerLevelId, limit = 3): MonetizationChannel[] {
  const tier = LEVEL_TIER[careerLevelId];
  return MONETIZATION_CHANNELS.filter((c) => LEVEL_TIER[c.minCareerLevel] > tier)
    .sort((a, b) => LEVEL_TIER[a.minCareerLevel] - LEVEL_TIER[b.minCareerLevel])
    .slice(0, limit)
    .map((c) => ({
      ...c,
      description: `Unlocks at ${getCareerLevel(c.minCareerLevel).label}`,
    }));
}
