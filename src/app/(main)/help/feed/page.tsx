import type { Metadata } from "next";
import LegalDocument, { LegalSection } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Feed & Social | POP'IT Help",
};

export default function HelpFeedPage() {
  return (
    <LegalDocument title="Feed & Social" updated="June 22, 2026" backHref="/help" backLabel="Help">
      <LegalSection title="Feed tab">
        <p>
          Following, Reels, and Thoughts — posts from people you follow with likes, comments, reposts,
          and saves.
        </p>
      </LegalSection>
      <LegalSection title="Comments & replies">
        <p>
          Tap the comment icon on any post to open the thread. Like comments or reply to start
          conversations.
        </p>
      </LegalSection>
      <LegalSection title="Create">
        <p>
          Use the CREATE side rail for Go Live, Story, Page post, or Reel. Posts appear on your profile
          under POP and City tabs.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
