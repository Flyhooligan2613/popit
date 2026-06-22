import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | POP'IT",
  description: "POP'IT Privacy Policy — how we handle your personal information.",
  openGraph: {
    title: "Privacy Policy | POP'IT",
    url: "https://www.getpopit.com/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" updated="June 19, 2026">
      <LegalSection title="1. Overview">
        <p>
          POP&apos;IT (&quot;we,&quot; &quot;us&quot;) respects your privacy. This policy explains what
          information we collect, how we use it, and your choices. This policy applies to our website,
          PWA, and related services at getpopit.com.
        </p>
      </LegalSection>
      <LegalSection title="2. Information We Collect">
        <ul>
          <li>
            <strong>Account data:</strong> username, email, phone (optional), password hash, identity
            lane, interests, and profile settings.
          </li>
          <li>
            <strong>Location data:</strong> approximate or precise city/region when you grant location
            permission; otherwise inferred region from device time zone.
          </li>
          <li>
            <strong>Content:</strong> posts, stories, reels, messages, live streams, and metadata you
            create.
          </li>
          <li>
            <strong>Device & usage:</strong> browser type, IP address, app interactions, crash logs, and
            cookies/local storage identifiers.
          </li>
          <li>
            <strong>Permissions:</strong> camera, microphone, photos, notifications — only when you
            grant them for specific features.
          </li>
        </ul>
      </LegalSection>
      <LegalSection title="3. How We Use Information">
        <ul>
          <li>Provide and personalize city feeds, maps, search, and discovery.</li>
          <li>Authenticate users and secure accounts.</li>
          <li>Improve performance, safety, and product features.</li>
          <li>Send service notifications and, with consent, marketing messages.</li>
          <li>Comply with law and enforce our policies.</li>
        </ul>
      </LegalSection>
      <LegalSection title="4. Sharing">
        <p>
          We do not sell your personal information. We may share data with service providers (hosting,
          analytics, authentication) under contract, when required by law, or to protect rights and
          safety. Public profile and content you choose to share are visible to other users.
        </p>
      </LegalSection>
      <LegalSection title="5. Location Choices">
        <p>
          You can deny location permission and still use POP&apos;IT. We will use time-zone-based
          estimates for U.S. users when GPS is unavailable. You can change location permissions in your
          device or browser settings at any time.
        </p>
      </LegalSection>
      <LegalSection title="6. Retention & Deletion">
        <p>
          We retain data while your account is active and as needed for legal, security, and backup
          purposes. See{" "}
          <a href="/legal/data-deletion" className="legal-doc__link">
            Data Deletion Instructions
          </a>{" "}
          to request account deletion.
        </p>
      </LegalSection>
      <LegalSection title="7. Children">
        <p>
          POP&apos;IT is not directed to children under 13. We do not knowingly collect personal
          information from children under 13. Contact us if you believe a child has provided data.
        </p>
      </LegalSection>
      <LegalSection title="8. International Users">
        <p>
          If you access POP&apos;IT from outside the United States, your information may be processed in
          the U.S. or other countries where our providers operate.
        </p>
      </LegalSection>
      <LegalSection title="9. Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, delete, or port your
          data, and to opt out of certain processing. Contact{" "}
          <a href="mailto:privacy@getpopit.com" className="legal-doc__link">
            privacy@getpopit.com
          </a>
          .
        </p>
      </LegalSection>
      <LegalSection title="10. Updates">
        <p>
          We may update this Privacy Policy. The &quot;Last updated&quot; date reflects the latest
          version. Material changes will be communicated in-app or by email where required.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
