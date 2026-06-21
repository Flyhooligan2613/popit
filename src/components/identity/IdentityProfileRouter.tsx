"use client";

import { memo } from "react";
import type { UserProfile } from "@/lib/identity/userProfile";
import { getProfileTemplate } from "@/lib/identity/types";
import SocialProfileLayout from "@/components/profile/SocialProfileLayout";
import ProfileIdentityExtras from "@/components/profile/ProfileIdentityExtras";

type IdentityProfileRouterProps = {
  user: UserProfile;
  isOwnProfile?: boolean;
};

function IdentityProfileRouter({ user, isOwnProfile = false }: IdentityProfileRouterProps) {
  const template = getProfileTemplate(user.identity);

  return (
    <SocialProfileLayout user={user} isOwnProfile={isOwnProfile}>
      <ProfileIdentityExtras user={user} template={template} />
    </SocialProfileLayout>
  );
}

export default memo(IdentityProfileRouter);
