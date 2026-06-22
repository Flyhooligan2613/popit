import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Monetization Requirements | POP'IT",
  description: "Eligibility requirements for POP'IT creator monetization.",
};

export default function MonetizationRequirementsPage() {
  return (
    <LegalDocument
      title="Eligibility Requirements"
      updated="June 19, 2026"
      backHref="/monetization"
      backLabel="Monetization"
      contactEmail="creators@getpopit.com"
    >
      <LegalSection title="Account basics">
        <ul>
          <li>Active POP&apos;IT account with completed onboarding</li>
          <li>Accurate profile information and identity lane selection</li>
          <li>Compliance with our Terms, Privacy Policy, and Community Guidelines</li>
          <li>No active strikes, suspensions, or monetization holds</li>
        </ul>
      </LegalSection>

      <LegalSection title="Age & payout eligibility">
        <p>
          You must be at least 18 years old (or the age of majority where you live) to receive
          payouts. Minors may use POP&apos;IT for expression and community, but paid monetization
          requires verified adult account ownership and tax information where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Content & authenticity">
        <ul>
          <li>Original or properly licensed content — no unauthorized music, video, or branding</li>
          <li>No spam, engagement bait, bot activity, or purchased followers/likes</li>
          <li>Transparent disclosure of sponsored or affiliate content</li>
          <li>Live streams must follow music copyright and safety rules shown in-app</li>
          <li>Location and check-in posts should reflect genuine visits when used for referrals</li>
        </ul>
      </LegalSection>

      <LegalSection title="Metrics thresholds (by level)">
        <p>
          Each creator level has minimum follower, total-like, and POP Score requirements. These
          metrics are evaluated on a rolling basis and must be maintained in good standing:
        </p>
        <ul>
          <li>
            <strong>Verified Creator (Blue POP Mark):</strong> 25,000+ followers, 100,000+ total
            likes, POP Score 55+
          </li>
          <li>
            <strong>Rising Creator (Green POP Mark):</strong> 100,000+ followers, 250,000+ total
            likes, POP Score 68+
          </li>
          <li>
            <strong>Elite tier progression:</strong> 250,000+ followers, 750,000+ total likes, POP
            Score 78+
          </li>
          <li>
            <strong>Gold POP Mark (business/creator):</strong> 500,000+ followers, 1,000,000+ total
            likes, POP Score 88+, business eligibility where applicable
          </li>
          <li>
            <strong>Legend & ICON:</strong> invitation-only or manual review — see{" "}
            <a href="/monetization/levels" className="legal-doc__link">
              Creator Levels
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Verification">
        <p>
          POP&apos;IT may require identity verification, business documentation, or tax forms before
          enabling payouts. Failure to complete verification within the requested window may delay
          monetization.
        </p>
      </LegalSection>

      <LegalSection title="Enforcement">
        <p>
          We may reduce visibility, pause monetization, or permanently remove program access for
          violations — including fraud, hate speech, dangerous acts, sexual content involving minors,
          or repeated copyright strikes. See our{" "}
          <a href="/legal/acceptable-use" className="legal-doc__link">
            Acceptable Use Policy
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
