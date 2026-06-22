import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Community Guidelines | POP'IT",
  description: "POP'IT Community Guidelines — safety and content standards.",
};

export default function CommunityGuidelinesPage() {
  return (
    <LegalDocument title="Community Guidelines" updated="June 19, 2026">
      <LegalSection title="Be real, be respectful">
        <p>
          POP&apos;IT is built around cities, creators, and live culture. Treat others the way you would
          in your own neighborhood — no harassment, hate speech, threats, or targeted abuse.
        </p>
      </LegalSection>
      <LegalSection title="Safe content">
        <ul>
          <li>No illegal activity, violence, or exploitation — especially involving minors.</li>
          <li>No non-consensual intimate imagery or doxing.</li>
          <li>No spam, scams, impersonation, or misleading business listings.</li>
          <li>Live streams and stories must follow the same standards as posts.</li>
        </ul>
      </LegalSection>
      <LegalSection title="Business & venue listings">
        <p>
          Verified venues and business pages must represent real locations. Fake check-ins, review
          manipulation, and paid engagement schemes are prohibited.
        </p>
      </LegalSection>
      <LegalSection title="Enforcement">
        <p>
          We may remove content, restrict features, or suspend accounts that violate these guidelines
          or our{" "}
          <a href="/legal/acceptable-use" className="legal-doc__link">
            Acceptable Use Policy
          </a>
          . Repeat or severe violations may result in permanent removal.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
