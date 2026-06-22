import type { Metadata } from "next";
import Link from "next/link";
import "../../legal/legal.css";

export const metadata: Metadata = {
  title: "Help Center | POP'IT",
  description: "Learn how POP'IT works — POP Scores, permissions, profiles, and more.",
};

const GUIDES = [
  { href: "/help/pop-scores", title: "POP Scores", hint: "What they mean and how they grow" },
  { href: "/help/permissions", title: "Permissions", hint: "Location, camera, photos, mic, alerts" },
  { href: "/help/identities", title: "Identities & Lanes", hint: "Gamer, creator, business, and more" },
  { href: "/help/backgrounds", title: "Page Backgrounds", hint: "Flags, city energy, and identity vibes" },
  { href: "/help/your-city", title: "Your City", hint: "Pulse feed, districts, and local discovery" },
  { href: "/help/feed", title: "Feed & Social", hint: "Posts, comments, likes, and reels" },
  { href: "/monetization", title: "Creator Monetization", hint: "Earn on POP'IT" },
];

export default function HelpIndexPage() {
  return (
    <div className="legal-index">
      <Link href="/settings" className="legal-doc__back">
        ← Settings
      </Link>
      <h1 className="legal-index__title">Help Center</h1>
      <p className="legal-index__intro">
        Tap any section to learn what it does and how to get the most from POP&apos;IT.
      </p>
      <nav className="legal-index__list" aria-label="Help topics">
        {GUIDES.map(({ href, title, hint }) => (
          <Link key={href} href={href} className="legal-index__item">
            {title}
            <span>{hint}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
