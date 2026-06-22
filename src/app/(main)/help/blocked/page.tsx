import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blocked Accounts | POP'IT Help",
};

export default function HelpBlockedPage() {
  return (
    <LegalDocument title="Blocked Accounts" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="What blocking does">
        <ul>
          <li>Blocked users cannot message you</li>
          <li>They won&apos;t see your live streams or stories in discovery</li>
          <li>You can unblock anytime from Settings</li>
        </ul>
      </LegalSection>
      <LegalSection title="Manage blocks">
        <p>
          <Link href="/settings/blocked" className="legal-doc__link">
            Settings → Blocked Accounts
          </Link>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
