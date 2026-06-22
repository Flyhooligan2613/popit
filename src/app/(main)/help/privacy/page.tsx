import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | POP'IT Help",
};

export default function HelpPrivacyPage() {
  return (
    <LegalDocument title="Privacy & Visibility" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Your POP card">
        <p>
          Your profile, posts, and live status can be seen by people in your city and followers.
          You control device permissions separately in Settings.
        </p>
      </LegalSection>
      <LegalSection title="Blocked accounts">
        <p>
          Blocked users cannot message you or interact with your POP card. Manage blocks in{" "}
          <Link href="/settings/blocked" className="legal-doc__link">
            Settings → Blocked Accounts
          </Link>
          .
        </p>
      </LegalSection>
      <LegalSection title="Full policy">
        <p>
          Read our{" "}
          <Link href="/legal/privacy" className="legal-doc__link">
            Privacy Policy
          </Link>{" "}
          for data collection and deletion details.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
