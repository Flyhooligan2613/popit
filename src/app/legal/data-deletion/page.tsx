import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Data Deletion | POP'IT",
  description: "How to request deletion of your POP'IT account and personal data.",
};

export default function DataDeletionPage() {
  return (
    <LegalDocument title="Data Deletion Instructions" updated="June 19, 2026">
      <LegalSection title="Delete in the app">
        <p>
          Go to <strong>Settings → Privacy & Account → Log Out</strong>, then contact us to fully
          delete your account if self-service deletion is not yet available in your build.
        </p>
      </LegalSection>
      <LegalSection title="Email request">
        <p>
          Send an email from the address tied to your account to{" "}
          <a href="mailto:privacy@getpopit.com" className="legal-doc__link">
            privacy@getpopit.com
          </a>{" "}
          with the subject line <strong>POP&apos;IT Data Deletion Request</strong>. Include your username
          and confirm you want permanent deletion.
        </p>
      </LegalSection>
      <LegalSection title="What we delete">
        <p>
          We delete profile data, credentials, and associated content where technically feasible.
          Some records may be retained as required by law, fraud prevention, or backup cycles (typically
          up to 30 days).
        </p>
      </LegalSection>
      <LegalSection title="Third-party logins">
        <p>
          If you signed in with Google, Apple, or Facebook, revoke POP&apos;IT access in that
          provider&apos;s account settings as well.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
