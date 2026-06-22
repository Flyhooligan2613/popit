import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Go Live | POP'IT Help",
};

export default function HelpGoLivePage() {
  return (
    <LegalDocument title="Go Live" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Before you go live">
        <ol>
          <li>Tap Create → Go Live</li>
          <li>Tap Enable Camera &amp; Mic and allow browser access</li>
          <li>Add a stream title and optional sing-along track</li>
          <li>Tap Start Live — you&apos;ll appear on POPIT Live near your city</li>
        </ol>
      </LegalSection>
      <LegalSection title="Camera or mic not working?">
        <ul>
          <li>Open Settings → Device Permissions and turn Camera and Microphone On</li>
          <li>Close other apps using your camera</li>
          <li>Refresh the page and try Enable Camera &amp; Mic again</li>
        </ul>
        <p>
          <Link href="/settings/permissions" className="legal-doc__link">
            Fix permissions →
          </Link>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
