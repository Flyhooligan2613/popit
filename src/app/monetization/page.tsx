import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creator Monetization | POP'IT",
  description: "Learn how to earn on POP'IT — creator levels, requirements, and monetization programs.",
  robots: { index: true, follow: true },
};

const GUIDES = [
  {
    href: "/monetization/overview",
    title: "Creator Program Overview",
    hint: "How POP'IT pays creators and businesses in your city",
  },
  {
    href: "/monetization/requirements",
    title: "Eligibility Requirements",
    hint: "Age, account standing, content rules, and verification",
  },
  {
    href: "/monetization/levels",
    title: "Creator Levels & POP Marks",
    hint: "Rising through Verified, Elite, Gold, Legend, and ICON",
  },
  {
    href: "/monetization/how-to-qualify",
    title: "How to Qualify & Apply",
    hint: "Step-by-step path to unlock monetization channels",
  },
  {
    href: "/monetization/channels",
    title: "Monetization Channels",
    hint: "Referrals, live gifts, subscriptions, marketplace, and more",
  },
];

export default function MonetizationIndexPage() {
  return (
    <div className="legal-index">
      <h1 className="legal-index__title">Creator Monetization</h1>
      <p className="legal-index__intro">
        POP&apos;IT rewards creators and local businesses who drive real city activity. These guides
        explain how our program works — similar to creator fund and monetization policies on other
        platforms, tailored for your city.
      </p>
      <nav className="legal-index__list" aria-label="Monetization guides">
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
