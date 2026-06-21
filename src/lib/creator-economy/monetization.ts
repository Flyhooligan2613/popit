import { getStatusLevel } from "./statusLevels";
import type { PopStatusId, MonetizationChannel } from "./types";

export const MONETIZATION_CHANNELS: MonetizationChannel[] = [
  {
    id: "restaurant-referrals",
    label: "Restaurant Referrals",
    description: "Rewarded when you influence dining visits",
    minCareerLevel: "rising-creator",
    icon: "🍽",
  },
  {
    id: "community-challenges",
    label: "Community Challenges",
    description: "Prize pools for positive city contributions",
    minCareerLevel: "rising-creator",
    icon: "🏆",
  },
  {
    id: "creator-bonus",
    label: "Creator Bonuses",
    description: "Earn when your content drives real city activity",
    minCareerLevel: "verified-creator",
    icon: "✦",
  },
  {
    id: "live-gifts",
    label: "Live Gifts",
    description: "Receive support during live city broadcasts",
    minCareerLevel: "verified-creator",
    icon: "🎁",
  },
  {
    id: "event-referrals",
    label: "Event Referrals",
    description: "Commission when your audience shows up",
    minCareerLevel: "verified-creator",
    icon: "🎟",
  },
  {
    id: "affiliate",
    label: "Affiliate Programs",
    description: "Share products your city actually uses",
    minCareerLevel: "elite-creator",
    icon: "🔗",
  },
  {
    id: "business-partnerships",
    label: "Business Partnerships",
    description: "Local brands collaborate with trusted creators",
    minCareerLevel: "elite-creator",
    icon: "🤝",
  },
  {
    id: "ticket-commissions",
    label: "Ticket Commissions",
    description: "Earn on events you help fill",
    minCareerLevel: "elite-creator",
    icon: "🎫",
  },
  {
    id: "premium-subscriptions",
    label: "Premium Subscriptions",
    description: "Offer exclusive access to your community",
    minCareerLevel: "elite-creator",
    icon: "⭐",
  },
  {
    id: "brand-collabs",
    label: "Brand Collaborations",
    description: "Paid campaigns with local businesses",
    minCareerLevel: "gold-status",
    icon: "📣",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Sell digital and local experiences",
    minCareerLevel: "gold-status",
    icon: "🛍",
  },
  {
    id: "digital-products",
    label: "Digital Products",
    description: "Guides, presets, and city resources",
    minCareerLevel: "diamond",
    icon: "📦",
  },
];

const LEVEL_TIER: Record<PopStatusId, number> = {
  rising: 1,
  "rising-creator": 2,
  "verified-creator": 3,
  "elite-creator": 4,
  "gold-status": 5,
  diamond: 6,
  icon: 7,
};

export function getEligibleChannels(careerLevelId: PopStatusId): MonetizationChannel[] {
  const tier = LEVEL_TIER[careerLevelId];
  return MONETIZATION_CHANNELS.filter((c) => LEVEL_TIER[c.minCareerLevel] <= tier);
}

export function getUpcomingChannels(careerLevelId: PopStatusId, limit = 3): MonetizationChannel[] {
  const tier = LEVEL_TIER[careerLevelId];
  return MONETIZATION_CHANNELS.filter((c) => LEVEL_TIER[c.minCareerLevel] > tier)
    .sort((a, b) => LEVEL_TIER[a.minCareerLevel] - LEVEL_TIER[b.minCareerLevel])
    .slice(0, limit)
    .map((c) => ({
      ...c,
      description: `Unlocks at ${getStatusLevel(c.minCareerLevel).label}`,
    }));
}
