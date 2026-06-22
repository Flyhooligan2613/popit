import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import { MONETIZATION_CHANNELS } from "@/lib/creator-economy/monetization";
import { getStatusLevel } from "@/lib/creator-economy/statusLevels";

export const metadata: Metadata = {
  title: "Monetization Channels | POP'IT",
  description: "All POP'IT monetization channels and when they unlock.",
};

export default function MonetizationChannelsPage() {
  return (
    <LegalDocument
      title="Monetization Channels"
      updated="June 19, 2026"
      backHref="/monetization"
      backLabel="Monetization"
      contactEmail="creators@getpopit.com"
    >
      <LegalSection title="Available channels">
        <p>
          Each channel unlocks at a specific creator level. Channels may roll out by region and
          require additional verification before payouts begin.
        </p>
        <ul>
          {MONETIZATION_CHANNELS.map((channel) => (
            <li key={channel.id}>
              {channel.icon} <strong>{channel.label}</strong> — {channel.description}. Unlocks at{" "}
              {getStatusLevel(channel.minCareerLevel).label}.
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Payout timing">
        <p>
          Earnings typically settle after a review period (often 7–30 days) to allow for fraud checks
          and refund windows on referrals or ticket sales. Minimum withdrawal amounts and supported
          payout methods vary by country.
        </p>
      </LegalSection>

      <LegalSection title="Taxes & reporting">
        <p>
          You are responsible for reporting income according to your local laws. POP&apos;IT may
          issue tax forms where required. Consult a tax professional for guidance on creator and
          business earnings.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
