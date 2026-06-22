import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Your City | POP'IT Help",
};

export default function HelpYourCityPage() {
  return (
    <LegalDocument title="Your City" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Your City tab">
        <p>
          The Your City tab is your local pulse — hero profile, stories, local feed, districts, and
          community threads for where you are.
        </p>
      </LegalSection>
      <LegalSection title="City name">
        <p>
          POP&apos;IT detects your city from GPS or time zone. Update anytime in Settings → Update My
          City. We never default to a random city without your permission.
        </p>
      </LegalSection>
      <LegalSection title="Profile from Your City">
        <p>
          Tap your profile icon or Settings → Edit Profile to see your posts, POP grid, and city feed.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
