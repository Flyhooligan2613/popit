import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Creator Program Overview | POP'IT",
  description: "Overview of POP'IT creator monetization and city rewards.",
};

export default function MonetizationOverviewPage() {
  return (
    <LegalDocument
      title="Creator Program Overview"
      updated="June 19, 2026"
      backHref="/monetization"
      backLabel="Monetization"
      contactEmail="creators@getpopit.com"
    >
      <LegalSection title="What is the POP'IT Creator Program?">
        <p>
          The POP&apos;IT Creator Program lets eligible creators, performers, and local businesses
          earn when their content and community activity drive real outcomes in their city — dining
          visits, event attendance, live engagement, and trusted local commerce.
        </p>
        <p>
          Unlike generic ad-revenue splits, POP&apos;IT monetization is tied to{" "}
          <strong>city impact</strong>: referrals, check-ins, live gifts, partnerships, and
          premium community access.
        </p>
      </LegalSection>

      <LegalSection title="Who can participate?">
        <ul>
          <li>Creators and performers with an active POP&apos;IT account in good standing</li>
          <li>Verified local businesses with a business-eligible POP Mark (Gold tier and above)</li>
          <li>Residents 18+ (or the age of majority in your region) for paid payouts</li>
          <li>Accounts that meet minimum follower, engagement, and POP Score thresholds</li>
        </ul>
      </LegalSection>

      <LegalSection title="How earnings work">
        <p>
          Monetization unlocks in stages as you advance through{" "}
          <a href="/monetization/levels" className="legal-doc__link">
            creator levels
          </a>
          . Early tiers unlock community challenges and referral tracking. Higher tiers unlock live
          gifts, ticket commissions, affiliate programs, marketplace sales, and brand collaborations.
        </p>
        <p>
          POP&apos;IT may review activity for authenticity. Artificial engagement, fake referrals,
          or policy violations can pause or revoke monetization access.
        </p>
      </LegalSection>

      <LegalSection title="Related policies">
        <ul>
          <li>
            <a href="/monetization/requirements" className="legal-doc__link">
              Eligibility Requirements
            </a>
          </li>
          <li>
            <a href="/legal/community-guidelines" className="legal-doc__link">
              Community Guidelines
            </a>
          </li>
          <li>
            <a href="/legal/terms" className="legal-doc__link">
              Terms of Service
            </a>
          </li>
        </ul>
      </LegalSection>
    </LegalDocument>
  );
}
