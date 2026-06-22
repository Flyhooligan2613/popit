import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Backgrounds | POP'IT Help",
};

export default function HelpBackgroundsPage() {
  return (
    <LegalDocument title="Page Backgrounds" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="What backgrounds do">
        <p>
          Backgrounds personalize your POP card, profile, and city views. Choose flags, identity vibes,
          city energy, or culture patterns during onboarding Step 3 or anytime in Settings.
        </p>
      </LegalSection>
      <LegalSection title="Gamer & identity backgrounds">
        <p>
          Identity lanes like Gamer have matching backgrounds (e.g. Gamer Grid). Pick one to style your
          page even when the layout is shared across users.
        </p>
      </LegalSection>
      <LegalSection title="Change your background">
        <p>
          Go to{" "}
          <Link href="/settings" className="legal-doc__link">
            Settings → Platform Background
          </Link>{" "}
          to update.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
