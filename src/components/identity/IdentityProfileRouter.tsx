"use client";

import { memo } from "react";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getProfileTemplate } from "@/lib/identity/types";
import PersonalProfile from "./PersonalProfile";
import BusinessProfile from "./BusinessProfile";
import GamerProfile from "./GamerProfile";
import AthleteProfile from "./AthleteProfile";
import CreatorProfile from "./CreatorProfile";
import RestaurantProfile from "./RestaurantProfile";
import NightclubProfile from "./NightclubProfile";
import DJProfile from "./DJProfile";

type IdentityProfileRouterProps = {
  user: UserProfile;
};

function IdentityProfileRouter({ user }: IdentityProfileRouterProps) {
  const template = getProfileTemplate(user.identity);

  switch (template) {
    case "gamer":
      return <GamerProfile user={user} />;
    case "athlete":
      return <AthleteProfile user={user} />;
    case "creator":
      return <CreatorProfile user={user} />;
    case "business":
      return <BusinessProfile user={user} />;
    case "restaurant":
      return <RestaurantProfile user={user} />;
    case "nightclub":
      return <NightclubProfile user={user} />;
    case "dj":
      return <DJProfile user={user} />;
    default:
      return <PersonalProfile user={user} />;
  }
}

export default memo(IdentityProfileRouter);
