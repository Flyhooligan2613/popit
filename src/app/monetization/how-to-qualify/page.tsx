import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "How to Qualify for Monetization | POP'IT",
  description: "Step-by-step guide to qualify for POP'IT creator monetization.",
};

export default function MonetizationHowToQualifyPage() {
  return (
    <LegalDocument
      title="How to Qualify & Apply"
      updated="June 19, 2026"
      backHref="/monetization"
      backLabel="Monetization"
      contactEmail="creators@getpopit.com"
    >
      <LegalSection title="Step 1 — Build your POP card">
        <p>
          Complete onboarding, choose your identity lane, and keep your profile photo, bio, and city
          accurate. Your POP card is how brands and your audience discover you.
        </p>
      </LegalSection>

      <LegalSection title="Step 2 — Post consistently">
        <ul>
          <li>Share Page posts, Thoughts, Stories, and Pulse reels from your profile side rail</li>
          <li>Use licensed music when adding tracks — acknowledge copyright prompts in-app</li>
          <li>Tag venues and neighborhoods when posting check-ins and city content</li>
          <li>Go Live for real-time engagement once you unlock streaming tools</li>
        </ul>
      </LegalSection>

      <LegalSection title="Step 3 — Grow authentic engagement">
        <p>
          Focus on followers who genuinely interact with your city content. Likes, comments, saves,
          and reposts from real accounts improve your POP Score. Avoid engagement pods, bots, or
          misleading referral schemes — these can disqualify you.
        </p>
      </LegalSection>

      <LegalSection title="Step 4 — Meet level thresholds">
        <p>
          Track your followers, total likes, and POP Score against the requirements in{" "}
          <a href="/monetization/levels" className="legal-doc__link">
            Creator Levels
          </a>
          . When you cross a threshold and maintain good standing, new monetization channels appear
          in Settings → Monetization.
        </p>
      </LegalSection>

      <LegalSection title="Step 5 — Verify & connect payouts">
        <p>
          When invited or eligible for paid channels, complete identity verification and add payout
          details (where available in your region). Tax forms may be required before your first
          withdrawal.
        </p>
      </LegalSection>

      <LegalSection title="Step 6 — Apply for partnerships (Gold+)">
        <p>
          At Gold POP Mark and above, you may apply for brand collaborations, marketplace listings,
          and premium subscriptions. Our partnerships desk reviews city fit, audience quality, and
          compliance history.
        </p>
      </LegalSection>

      <LegalSection title="What if I'm not eligible yet?">
        <p>
          Keep creating. Many creators unlock their first referral and challenge rewards at Verified
          Creator (Blue POP Mark). Review{" "}
          <a href="/monetization/requirements" className="legal-doc__link">
            Eligibility Requirements
          </a>{" "}
          and ensure your account has no active violations.
        </p>
      </LegalSection>

      <LegalSection title="Need help?">
        <p>
          Email{" "}
          <a href="mailto:creators@getpopit.com" className="legal-doc__link">
            creators@getpopit.com
          </a>{" "}
          with your @username for monetization status questions.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
