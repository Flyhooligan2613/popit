"use client";

import { useEffect, useRef } from "react";

type MediaPreviewProps = {
  stream: MediaStream | null;
  label?: string;
};

export default function MediaPreview({ stream, label }: MediaPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !stream) return;
    video.srcObject = stream;
    void video.play().catch(() => {});
    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  if (!stream) return null;

  return (
    <div className="social-sheet__media-preview">
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className="social-sheet__media-video"
        aria-label={label ?? "Camera preview"}
      />
      {label && <span className="social-sheet__media-label">{label}</span>}
    </div>
  );
}
