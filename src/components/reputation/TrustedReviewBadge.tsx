"use client";

import type { TrustedReviewLabel } from "@/lib/reputation/types";

type TrustedReviewBadgeProps = {
  label: TrustedReviewLabel;
  className?: string;
};

export default function TrustedReviewBadge({ label, className = "" }: TrustedReviewBadgeProps) {
  return (
    <span className={`trusted-review-badge trusted-review-badge--${label.id} ${className}`}>
      <span aria-hidden>{label.emoji}</span>
      {label.text}
    </span>
  );
}
