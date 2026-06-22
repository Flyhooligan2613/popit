import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Identities | POP'IT Help",
};

export default function HelpIdentitiesPage() {
  return (
    <LegalDocument title="Identities & Lanes" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Multiple lanes">
        <p>
          During signup you can pick up to three identity lanes — Gamer, Creator, Business, and more.
          Your profile shows all selected lanes. Your page look comes from the background you choose.
        </p>
      </LegalSection>
      <LegalSection title="Specialty topic">
        <p>
          After picking a primary lane, choose a specialty topic (e.g. FPS, nightlife, fitness) so the
          city knows what you&apos;re about.
        </p>
      </LegalSection>
      <LegalSection title="Update anytime">
        <p>
          Change identity, background, and bio from Settings → Edit Profile or Platform Background.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
