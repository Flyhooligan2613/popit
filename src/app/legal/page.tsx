import Link from "next/link";

const POLICIES = [
  {
    href: "/legal/terms",
    title: "Terms of Service",
    hint: "Account rules, content license, and platform use",
  },
  {
    href: "/legal/privacy",
    title: "Privacy Policy",
    hint: "How we collect, use, and protect your data",
  },
  {
    href: "/legal/community-guidelines",
    title: "Community Guidelines",
    hint: "Safety standards for creators, businesses, and live content",
  },
  {
    href: "/legal/acceptable-use",
    title: "Acceptable Use Policy",
    hint: "Prohibited conduct and enforcement",
  },
  {
    href: "/legal/cookies",
    title: "Cookie Policy",
    hint: "Cookies, local storage, and similar technologies",
  },
  {
    href: "/legal/data-deletion",
    title: "Data Deletion Instructions",
    hint: "How to request deletion of your account and data",
  },
];

export default function LegalIndexPage() {
  return (
    <div className="legal-index">
      <h1 className="legal-index__title">Legal & Policies</h1>
      <nav className="legal-index__list" aria-label="Legal documents">
        {POLICIES.map(({ href, title, hint }) => (
          <Link key={href} href={href} className="legal-index__item">
            {title}
            <span>{hint}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
