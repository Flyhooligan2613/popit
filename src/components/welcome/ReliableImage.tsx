"use client";

import { useState } from "react";

type ReliableImageProps = {
  src: string;
  alt?: string;
  className?: string;
  fallbackClassName?: string;
  fallbackIcon?: string;
  loading?: "lazy" | "eager";
};

export default function ReliableImage({
  src,
  alt = "",
  className,
  fallbackClassName,
  fallbackIcon = "✦",
  loading = "lazy",
}: ReliableImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={fallbackClassName} aria-hidden>
        {fallbackIcon}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
