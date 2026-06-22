import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Location | POP'IT Help",
};

export default function HelpLocationPage() {
  return (
    <LegalDocument title="Your City & Location" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="How POP'IT finds your city">
        <p>
          POP&apos;IT uses your device GPS to show the right local feed, weather, and nearby people.
          We do not guess &quot;New York&quot; from your time zone — you need to allow location access.
        </p>
      </LegalSection>
      <LegalSection title="Fix wrong city">
        <ol>
          <li>Open Settings → Update My City → Detect from GPS</li>
          <li>Allow location when your browser asks</li>
          <li>If still wrong, check Settings → Device Permissions → Location is On</li>
          <li>On iPhone/Android, also enable location for your browser in system settings</li>
        </ol>
      </LegalSection>
      <LegalSection title="Manage location">
        <p>
          <Link href="/settings/location" className="legal-doc__link">
            Settings → Update My City
          </Link>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
