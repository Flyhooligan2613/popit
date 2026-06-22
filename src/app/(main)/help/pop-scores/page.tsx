import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "POP Scores | POP'IT Help",
};

export default function HelpPopScoresPage() {
  return (
    <LegalDocument title="POP Scores" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="What is a POP Score?">
        <p>
          Your POP Score reflects influence, engagement, and trust in your city. It combines followers,
          likes, check-ins, and community activity into one number you can grow over time.
        </p>
      </LegalSection>
      <LegalSection title="The side dock rings">
        <p>
          The POP rings on the left show your score and city leaders. Tap any ring to open this guide.
          Higher scores unlock creator levels and monetization paths.
        </p>
      </LegalSection>
      <LegalSection title="How to grow">
        <ul>
          <li>Post consistently — pages, thoughts, stories, and Pulse clips</li>
          <li>Engage authentically — likes, comments, and reposts from real people</li>
          <li>Check in to local venues and events</li>
          <li>Go Live and build community trust</li>
        </ul>
      </LegalSection>
    </LegalDocument>
  );
}
