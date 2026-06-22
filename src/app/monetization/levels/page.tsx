import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import { POP_STATUS_LEVELS } from "@/lib/creator-economy/statusLevels";

export const metadata: Metadata = {
  title: "Creator Levels & POP Marks | POP'IT",
  description: "POP'IT creator status levels, POP Marks, and unlocks.",
};

function formatRequirement(value: number | undefined, suffix: string) {
  if (value == null) return null;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M+ ${suffix}`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}K+ ${suffix}`;
  return `${value}+ ${suffix}`;
}

export default function MonetizationLevelsPage() {
  return (
    <LegalDocument
      title="Creator Levels & POP Marks"
      updated="June 19, 2026"
      backHref="/monetization"
      backLabel="Monetization"
      contactEmail="creators@getpopit.com"
    >
      <LegalSection title="How levels work">
        <p>
          Your POP Mark reflects trust, reach, and city impact. As you advance, new monetization
          channels and creator tools unlock automatically when you meet the metrics and maintain good
          standing.
        </p>
      </LegalSection>

      {POP_STATUS_LEVELS.map((level) => (
        <LegalSection key={level.id} title={`${level.badge} ${level.label}`}>
          <p>{level.tagline}</p>
          <ul>
            {level.requirements.minFollowers != null && (
              <li>{formatRequirement(level.requirements.minFollowers, "followers")}</li>
            )}
            {level.requirements.minTotalLikes != null && (
              <li>{formatRequirement(level.requirements.minTotalLikes, "total likes")}</li>
            )}
            {level.requirements.minPopScore != null && (
              <li>POP Score {level.requirements.minPopScore}+</li>
            )}
            {level.requirements.requiresGoodStanding && <li>Account in good standing</li>}
            {level.requirements.businessEligible && <li>Business eligibility review</li>}
            {level.requirements.invitationOnly && <li>Invitation-only tier</li>}
            {level.requirements.manualOnly && <li>Manual review by POP&apos;IT team</li>}
          </ul>
          <p>
            <strong>Unlocks:</strong> {level.unlocks.join(" · ")}
          </p>
        </LegalSection>
      ))}

      <LegalSection title="POP Mark colors">
        <ul>
          <li>
            <strong>Blue POP Mark</strong> — Verified Creator on the rise
          </li>
          <li>
            <strong>Green POP Mark</strong> — Rising Creator with community trust
          </li>
          <li>
            <strong>Gold POP Mark</strong> — Elite business or creator recognition
          </li>
          <li>
            <strong>Legend POP Mark</strong> — Invitation-only prestige tier
          </li>
          <li>
            <strong>ICON</strong> — Culture-defining status in your city
          </li>
        </ul>
      </LegalSection>
    </LegalDocument>
  );
}
