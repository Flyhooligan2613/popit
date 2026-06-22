"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "../../legal/legal.css";
import { searchSettingsHelp } from "@/lib/settings/settingsHelpIndex";

const GUIDES = [
  { href: "/help/pop-scores", title: "POP Scores", hint: "What they mean and how they grow" },
  { href: "/help/permissions", title: "Permissions", hint: "Location, camera, photos, mic, alerts" },
  { href: "/help/location", title: "Your City & GPS", hint: "Fix wrong city or location issues" },
  { href: "/help/go-live", title: "Go Live", hint: "Camera, mic, and broadcasting" },
  { href: "/help/posting", title: "Posting & Stories", hint: "Pages, reels, and stories" },
  { href: "/help/identities", title: "Identities & Lanes", hint: "Gamer, creator, business, and more" },
  { href: "/help/backgrounds", title: "Page Backgrounds", hint: "Flags, city energy, and identity vibes" },
  { href: "/help/your-city", title: "Your City", hint: "Pulse feed, districts, and local discovery" },
  { href: "/help/feed", title: "Feed & Social", hint: "Posts, comments, likes, and reels" },
  { href: "/help/privacy", title: "Privacy", hint: "Who sees your POP card" },
  { href: "/help/security", title: "Security", hint: "Password and account protection" },
  { href: "/help/blocked", title: "Blocked Accounts", hint: "Manage blocked users" },
  { href: "/monetization", title: "Creator Monetization", hint: "Earn on POP'IT" },
];

export default function HelpIndexPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSettingsHelp(query), [query]);

  const list = query.trim()
    ? results.map((r) => ({ href: r.href, title: r.label, hint: r.hint ?? r.section }))
    : GUIDES;

  return (
    <div className="legal-index">
      <Link href="/settings" className="legal-doc__back">
        ← Settings
      </Link>
      <h1 className="legal-index__title">Help Center</h1>
      <p className="legal-index__intro">
        Tap any section to learn what it does and how to fix common issues.
      </p>
      <div className="profile-settings__search legal-index__search">
        <input
          type="search"
          className="profile-settings__search-input"
          placeholder="Search help…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search help"
        />
      </div>
      <nav className="legal-index__list" aria-label="Help topics">
        {list.length === 0 ? (
          <p className="legal-index__intro">No matches — try &quot;camera&quot;, &quot;location&quot;, or &quot;live&quot;</p>
        ) : (
          list.map(({ href, title, hint }) => (
            <Link key={href + title} href={href} className="legal-index__item">
              {title}
              <span>{hint}</span>
            </Link>
          ))
        )}
      </nav>
    </div>
  );
}
