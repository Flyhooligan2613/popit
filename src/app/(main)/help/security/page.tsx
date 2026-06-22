import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security | POP'IT Help",
};

export default function HelpSecurityPage() {
  return (
    <LegalDocument title="Account Security" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Password & login">
        <p>
          Use a strong unique password for your POP&apos;IT account. If you signed up with email,
          password changes will be available in a future update — contact support if you need help now.
        </p>
      </LegalSection>
      <LegalSection title="Delete your data">
        <p>
          Request account deletion via{" "}
          <Link href="/legal/data-deletion" className="legal-doc__link">
            Data Deletion
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
