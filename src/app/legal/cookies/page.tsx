import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Cookie Policy | POP'IT",
  description: "How POP'IT uses cookies, local storage, and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalDocument title="Cookie Policy" updated="June 19, 2026">
      <LegalSection title="What we use">
        <p>
          POP&apos;IT uses local storage, session storage, and similar browser technologies to keep you
          signed in, remember preferences, cache city detection, and improve performance. We may use
          essential cookies for authentication when Supabase or other providers require them.
        </p>
      </LegalSection>
      <LegalSection title="Analytics & third parties">
        <p>
          If we enable analytics or social login (e.g., Google, Apple, Meta), those providers may set
          their own cookies subject to their policies. We do not sell personal data from cookies.
        </p>
      </LegalSection>
      <LegalSection title="Your choices">
        <p>
          You can clear site data in your browser or device settings. Clearing data may sign you out
          and reset local preferences. See our{" "}
          <a href="/legal/privacy" className="legal-doc__link">
            Privacy Policy
          </a>{" "}
          for more detail.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
