import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Location | POP'IT Help",
};

export default function HelpLocationPage() {
  return (
    <LegalDocument title="Your ZIP & POP Environment" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Why we use ZIP code">
        <p>
          POP&apos;IT uses your ZIP code — not continuous GPS tracking — to personalize your local feed,
          weather, and time of day. When you travel, open Settings and enter a new ZIP to switch your
          POP environment instantly.
        </p>
      </LegalSection>
      <LegalSection title="Change your ZIP">
        <ol>
          <li>Open Settings → Update My ZIP</li>
          <li>Enter a 5-digit U.S. ZIP code and tap Set POP environment</li>
          <li>Optional: use Find ZIP from device location once to auto-fill</li>
        </ol>
      </LegalSection>
      <LegalSection title="Manage location">
        <p>
          <Link href="/settings" className="legal-doc__link">
            Settings → Location
          </Link>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
