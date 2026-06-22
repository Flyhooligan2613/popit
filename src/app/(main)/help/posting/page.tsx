import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posting & Stories | POP'IT Help",
};

export default function HelpPostingPage() {
  return (
    <LegalDocument title="Posting, Stories & Reels" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Post to Page">
        <p>Text updates on your POP card — no camera required. Tap Create → Post to Page.</p>
      </LegalSection>
      <LegalSection title="Stories">
        <p>
          24-hour moments with motion effects. Tap Create → Post to Story, then Open Camera or Choose
          Photo/Video from your gallery.
        </p>
      </LegalSection>
      <LegalSection title="Reels">
        <p>
          Short vertical clips for Explore and Feed. Record with Camera &amp; Mic or upload from gallery,
          then add a caption.
        </p>
      </LegalSection>
      <LegalSection title="Permissions needed">
        <p>
          Camera and microphone must be allowed for stories and reels with video. Manage in{" "}
          <Link href="/settings/permissions" className="legal-doc__link">
            Device Permissions
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
