import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Service | POP'IT",
  description: "POP'IT Terms of Service — rules for using the platform.",
  openGraph: {
    title: "Terms of Service | POP'IT",
    url: "https://www.getpopit.com/legal/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" updated="June 19, 2026">
      <LegalSection title="1. Agreement">
        <p>
          By accessing or using POP&apos;IT (&quot;POP&apos;IT,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;), including our website, progressive web app, and related services, you agree to
          these Terms of Service and our{" "}
          <a href="/legal/privacy" className="legal-doc__link">
            Privacy Policy
          </a>
          . If you do not agree, do not use the service.
        </p>
      </LegalSection>
      <LegalSection title="2. Eligibility">
        <p>
          You must be at least 13 years old (or the minimum age required in your jurisdiction) to use
          POP&apos;IT. If you are under 18, you represent that you have parental or guardian consent. You
          may not use the service if you are barred under applicable law.
        </p>
      </LegalSection>
      <LegalSection title="3. Your Account">
        <p>
          You are responsible for your account credentials and all activity under your account. Provide
          accurate registration information. We may suspend or terminate accounts that violate these
          Terms or our{" "}
          <a href="/legal/community-guidelines" className="legal-doc__link">
            Community Guidelines
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection title="4. Content & License">
        <p>
          You retain ownership of content you post. By posting on POP&apos;IT, you grant us a worldwide,
          non-exclusive, royalty-free license to host, store, reproduce, display, distribute, and
          promote your content solely to operate, improve, and market the platform. You represent that
          you have all rights necessary to post your content.
        </p>
      </LegalSection>
      <LegalSection title="5. Location & Personalization">
        <p>
          POP&apos;IT may request device location to personalize city feeds, maps, and nearby discovery.
          Location is optional; if declined, we may infer a general region from device time zone. See our
          Privacy Policy for details.
        </p>
      </LegalSection>
      <LegalSection title="6. Prohibited Conduct">
        <p>
          You may not use POP&apos;IT to violate law, harass others, distribute malware, scrape data
          without permission, impersonate others, or post illegal or infringing content. See our{" "}
          <a href="/legal/acceptable-use" className="legal-doc__link">
            Acceptable Use Policy
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection title="7. Live Streaming & Commerce">
        <p>
          Live features and business profiles must comply with applicable laws, platform policies, and
          any third-party rights (including music licensing where applicable). We may remove content or
          restrict features that create legal or safety risk.
        </p>
      </LegalSection>
      <LegalSection title="8. Disclaimers">
        <p>
          POP&apos;IT is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
          uninterrupted service, accuracy of user-generated content, or availability of any venue,
          event, or business listing.
        </p>
      </LegalSection>
      <LegalSection title="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, POP&apos;IT and its affiliates are not liable for
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits,
          data, or goodwill arising from your use of the service.
        </p>
      </LegalSection>
      <LegalSection title="10. Changes & Contact">
        <p>
          We may update these Terms. Material changes will be posted on this page with an updated date.
          Continued use after changes constitutes acceptance. Contact:{" "}
          <a href="mailto:legal@getpopit.com" className="legal-doc__link">
            legal@getpopit.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
