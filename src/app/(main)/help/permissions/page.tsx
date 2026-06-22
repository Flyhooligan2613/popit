import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Permissions | POP'IT Help",
};

export default function HelpPermissionsPage() {
  return (
    <LegalDocument title="Device Permissions" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="You're in control">
        <p>
          Step 4 onboarding and Settings → Device Permissions use the same toggles. Turn any permission
          on or off at any time.
        </p>
      </LegalSection>
      <LegalSection title="Each permission">
        <ul>
          <li><strong>Location</strong> — shows your city and nearby feed</li>
          <li><strong>Camera</strong> — capture photos and video for posts</li>
          <li><strong>Photos</strong> — choose Share from gallery or Don&apos;t share photos</li>
          <li><strong>Microphone</strong> — required for Go Live and audio</li>
          <li><strong>Notifications</strong> — alerts when your city is active</li>
        </ul>
      </LegalSection>
      <LegalSection title="Manage permissions">
        <p>
          Open{" "}
          <Link href="/settings/permissions" className="legal-doc__link">
            Settings → Device Permissions
          </Link>{" "}
          to change them anytime.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
