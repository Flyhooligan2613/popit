"use client";

import Link from "next/link";
import { memo } from "react";

type PopSearchBarProps = {
  className?: string;
};

function PopSearchBar({ className = "" }: PopSearchBarProps) {
  return (
    <Link
      href="/search"
      className={`pop-search-bar ${className}`.trim()}
      aria-label="POP search — users, tabs, and sections"
    >
      <svg
        className="pop-search-bar__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <span className="pop-search-bar__text">POP search</span>
    </Link>
  );
}

export default memo(PopSearchBar);
