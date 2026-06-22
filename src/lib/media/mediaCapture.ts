import {
  getStoredPermissionStatus,
  setPermissionStatus,
} from "@/lib/permissions/platformPermissions";

export type MediaGateResult = {
  ok: boolean;
  stream?: MediaStream;
  error?: string;
};

export type FacingMode = "user" | "environment";

function isMediaSupported(): boolean {
  return typeof window !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
}

export function stopMediaStream(stream: MediaStream | null | undefined): void {
  stream?.getTracks().forEach((track) => track.stop());
}

async function requestMedia(facing: FacingMode, audio: boolean): Promise<MediaGateResult> {
  if (!isMediaSupported()) {
    return { ok: false, error: "Camera is not supported in this browser." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio,
    });
    setPermissionStatus("camera", "granted");
    if (audio) setPermissionStatus("microphone", "granted");
    return { ok: true, stream };
  } catch {
    setPermissionStatus("camera", "denied");
    if (audio) setPermissionStatus("microphone", "denied");
    return {
      ok: false,
      error: audio
        ? "Camera and microphone access was denied. Enable them in Settings → Device Permissions."
        : "Camera access was denied. Enable it in Settings → Device Permissions.",
    };
  }
}

export async function requestLiveMedia(): Promise<MediaGateResult> {
  return requestMedia("user", true);
}

export async function requestCameraPreview(): Promise<MediaGateResult> {
  return requestMedia("user", false);
}

export async function requestVideoWithAudio(): Promise<MediaGateResult> {
  return requestMedia("user", true);
}

export async function switchCameraStream(
  current: MediaStream | null,
  facing: FacingMode,
  audio: boolean
): Promise<MediaGateResult> {
  stopMediaStream(current);
  return requestMedia(facing, audio);
}

export function hasLiveMediaReady(): boolean {
  const camera = getStoredPermissionStatus("camera");
  const mic = getStoredPermissionStatus("microphone");
  return camera === "granted" && mic === "granted";
}

export async function pickPhotoOrVideo(): Promise<File | null> {
  if (typeof window === "undefined") return null;

  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.style.display = "none";

    input.addEventListener("change", () => {
      resolve(input.files?.[0] ?? null);
      input.remove();
    });

    document.body.appendChild(input);
    input.click();
  });
}

export async function capturePhotoFromVideo(video: HTMLVideoElement): Promise<Blob | null> {
  if (!video.videoWidth || !video.videoHeight) return null;
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92));
}

export class VideoRecorder {
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  constructor(private stream: MediaStream) {}

  start() {
    if (typeof MediaRecorder === "undefined") return false;
    this.chunks = [];
    try {
      this.recorder = new MediaRecorder(this.stream, { mimeType: this.pickMime() });
    } catch {
      this.recorder = new MediaRecorder(this.stream);
    }
    this.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };
    this.recorder.start(200);
    return true;
  }

  stop(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.recorder || this.recorder.state === "inactive") {
        resolve(this.chunks.length ? new Blob(this.chunks, { type: "video/webm" }) : null);
        return;
      }
      this.recorder.onstop = () => {
        resolve(this.chunks.length ? new Blob(this.chunks, { type: this.recorder?.mimeType ?? "video/webm" }) : null);
      };
      this.recorder.stop();
    });
  }

  get isRecording() {
    return this.recorder?.state === "recording";
  }

  private pickMime() {
    const types = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
    return types.find((t) => MediaRecorder.isTypeSupported(t)) ?? "video/webm";
  }
}
