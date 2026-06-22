import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | POP'IT",
  description: "POP'IT Acceptable Use Policy — prohibited conduct on the platform.",
};

export default function AcceptableUsePage() {
  return (
    <LegalDocument title="Acceptable Use Policy" updated="June 19, 2026">
      <LegalSection title="Prohibited uses">
        <p>You may not use POP&apos;IT to:</p>
        <ul>
          <li>Violate any law or third-party rights.</li>
          <li>Upload malware, scrape the service, or reverse engineer our systems.</li>
          <li>Automate fake accounts, bots, or artificial engagement.</li>
          <li>Collect location or personal data from users without consent.</li>
          <li>Circumvent security, rate limits, or moderation tools.</li>
        </ul>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>
          Only post content you own or have rights to use. Report infringement to{" "}
          <a href="mailto:legal@getpopit.com" className="legal-doc__link">
            legal@getpopit.com
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection title="Service integrity">
        <p>
          We may investigate abuse, cooperate with law enforcement when required, and limit access to
          protect users and platform stability.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
