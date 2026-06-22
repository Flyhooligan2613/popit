"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  capturePhotoFromVideo,
  pickPhotoOrVideo,
  requestCameraPreview,
  requestVideoWithAudio,
  stopMediaStream,
  switchCameraStream,
  VideoRecorder,
  type FacingMode,
} from "@/lib/media/mediaCapture";
import { persistMediaBlob } from "@/lib/media/mediaStorage";
import { loadUserProfile } from "@/lib/identity/userProfile";
import { getIdentityAccent } from "@/lib/identity/types";
import { createPost } from "@/lib/social/socialStore";
import { createStoryItem } from "@/lib/social/liveStore";
import { STORY_EFFECTS, storyEffectLabel, type StoryEffectId } from "@/lib/social/storyEffects";
import type { CreateMode } from "@/lib/social/createRoutes";

type CameraStudioProps = {
  mode: CreateMode;
};

const MODE_LABELS: Record<CreateMode, string> = {
  story: "Story",
  reel: "Reel",
  page: "Page",
  live: "Live",
};

export default function CameraStudio({ mode }: CameraStudioProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<VideoRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facing, setFacing] = useState<FacingMode>("user");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [effectId, setEffectId] = useState<StoryEffectId>("none");
  const [caption, setCaption] = useState("");
  const [flash, setFlash] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"image" | "video">("image");
  const [showEffects, setShowEffects] = useState(false);

  const needsAudio = mode === "reel";
  const effectClass = STORY_EFFECTS.find((e) => e.id === effectId)?.previewClass ?? "";

  const bindStream = useCallback((mediaStream: MediaStream) => {
    stopMediaStream(streamRef.current);
    streamRef.current = mediaStream;
    setStream(mediaStream);
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      void videoRef.current.play().catch(() => undefined);
    }
    recorderRef.current = needsAudio ? new VideoRecorder(mediaStream) : null;
  }, [needsAudio]);

  const startCamera = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = needsAudio ? await requestVideoWithAudio() : await requestCameraPreview();
    setLoading(false);
    if (!result.ok || !result.stream) {
      setError(result.error ?? "Could not open camera.");
      return;
    }
    bindStream(result.stream);
  }, [bindStream, needsAudio]);

  useEffect(() => {
    void startCamera();
    return () => stopMediaStream(streamRef.current);
  }, [startCamera]);

  useEffect(() => {
    if (!recording) return;
    const t = window.setInterval(() => setRecordSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const flipCamera = async () => {
    const next: FacingMode = facing === "user" ? "environment" : "user";
    const result = await switchCameraStream(streamRef.current, next, needsAudio);
    if (result.ok && result.stream) {
      setFacing(next);
      bindStream(result.stream);
    }
  };

  const handleCapturePhoto = async () => {
    if (!videoRef.current || !stream) return;
    setFlash(true);
    window.setTimeout(() => setFlash(false), 180);
    const blob = await capturePhotoFromVideo(videoRef.current);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setPreviewType("image");
  };

  const handleToggleRecord = async () => {
    if (!recorderRef.current || !stream) return;
    if (!recording) {
      const ok = recorderRef.current.start();
      if (!ok) {
        setError("Video recording is not supported in this browser.");
        return;
      }
      setRecordSeconds(0);
      setRecording(true);
      return;
    }
    setRecording(false);
    const blob = await recorderRef.current.stop();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setPreviewType("video");
  };

  const handleGallery = async () => {
    const file = await pickPhotoOrVideo();
    if (!file) return;
    stopMediaStream(streamRef.current);
    setStream(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewType(file.type.startsWith("video/") ? "video" : "image");
  };

  const clearPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    void startCamera();
  };

  const publish = async () => {
    setPublishing(true);
    try {
      const user = await loadUserProfile();
      if (!user) return;

      let mediaId: string | undefined;
      let mediaType: "image" | "video" | undefined;

      if (previewUrl) {
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        mediaId = await persistMediaBlob(blob);
        mediaType = previewType;
      } else if (videoRef.current && stream) {
        const blob = await capturePhotoFromVideo(videoRef.current);
        if (blob) {
          mediaId = await persistMediaBlob(blob);
          mediaType = "image";
        }
      }

      const trackLabel = undefined;
      const accent = getIdentityAccent(user.identity);

      if (mode === "story") {
        if (!mediaId || !mediaType) {
          setError("Capture a photo or video first.");
          return;
        }
        createStoryItem({
          authorUsername: user.username,
          authorName: user.name,
          authorAccent: accent,
          mediaId,
          mediaType,
          effectId,
          caption: caption.trim() || undefined,
          musicTrack: trackLabel,
        });
        router.push("/feed");
        return;
      }

      const text = caption.trim() || (mode === "reel" ? "New reel from the city" : "City update");
      createPost({
        kind: mode === "reel" ? "reel" : "page",
        text,
        title: mode === "reel" ? "Reel" : "Page post",
        authorUsername: user.username,
        authorName: user.name,
        authorAccent: accent,
        city: user.city,
        musicTrack: trackLabel,
        mediaId,
        mediaType,
        effectId: effectId !== "none" ? effectId : undefined,
      });

      router.push(mode === "reel" ? "/explore" : "/feed");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="camera-studio">
      <div className={`camera-studio__flash ${flash ? "is-on" : ""}`} aria-hidden />

      {previewUrl ? (
        <div className={`camera-studio__preview ${effectClass}`}>
          {previewType === "video" ? (
            <video src={previewUrl} className="camera-studio__media" autoPlay loop muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="" className="camera-studio__media" />
          )}
        </div>
      ) : (
        <div className={`camera-studio__preview ${effectClass}`}>
          {loading && <div className="camera-studio__loading">Opening camera…</div>}
          {error && (
            <div className="camera-studio__error">
              <p>{error}</p>
              <Link href="/settings/permissions">Fix permissions</Link>
            </div>
          )}
          <video
            ref={videoRef}
            className={`camera-studio__media ${facing === "user" ? "is-mirror" : ""}`}
            autoPlay
            playsInline
            muted
          />
        </div>
      )}

      <header className="camera-studio__top">
        <button type="button" className="camera-studio__icon-btn" onClick={() => router.back()} aria-label="Close">
          ✕
        </button>
        <span className="camera-studio__mode">{MODE_LABELS[mode]}</span>
        <button type="button" className="camera-studio__icon-btn" onClick={() => setShowEffects((v) => !v)} aria-label="Effects">
          ✨
        </button>
      </header>

      {showEffects && (
        <div className="camera-studio__effects-rail">
          {STORY_EFFECTS.map((fx) => (
            <button
              key={fx.id}
              type="button"
              className={`camera-studio__effect-chip ${effectId === fx.id ? "is-active" : ""}`}
              onClick={() => setEffectId(fx.id)}
            >
              <span className={`camera-studio__effect-dot ${fx.previewClass}`} />
              {fx.label}
            </button>
          ))}
        </div>
      )}

      {(mode === "reel" || mode === "page") && (
        <div className="camera-studio__caption-wrap">
          <input
            className="camera-studio__caption"
            placeholder={mode === "reel" ? "Add a caption…" : "Write your city update…"}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
      )}

      <footer className="camera-studio__controls">
        <button type="button" className="camera-studio__side-btn" onClick={() => void handleGallery()} aria-label="Gallery">
          🖼
        </button>

        {mode === "reel" ? (
          <button
            type="button"
            className={`camera-studio__shutter camera-studio__shutter--record ${recording ? "is-recording" : ""}`}
            onClick={() => void handleToggleRecord()}
            aria-label={recording ? "Stop recording" : "Start recording"}
          >
            <span>{recording ? "■" : "●"}</span>
          </button>
        ) : (
          <button
            type="button"
            className="camera-studio__shutter"
            onClick={() => void handleCapturePhoto()}
            aria-label="Capture photo"
          />
        )}

        <button type="button" className="camera-studio__side-btn" onClick={() => void flipCamera()} aria-label="Flip camera">
          🔄
        </button>
      </footer>

      {recording && (
        <div className="camera-studio__rec-badge">
          REC {String(Math.floor(recordSeconds / 60)).padStart(2, "0")}:{String(recordSeconds % 60).padStart(2, "0")}
        </div>
      )}

      <div className="camera-studio__publish-row">
        {previewUrl && (
          <button type="button" className="camera-studio__secondary" onClick={clearPreview}>
            Retake
          </button>
        )}
        <button
          type="button"
          className="camera-studio__primary"
          disabled={publishing}
          onClick={() => void publish()}
        >
          {publishing
            ? "Publishing…"
            : mode === "story"
              ? `Post Story · ${storyEffectLabel(effectId)}`
              : mode === "reel"
                ? "Publish Reel"
                : "Post to Page"}
        </button>
      </div>
    </div>
  );
}
