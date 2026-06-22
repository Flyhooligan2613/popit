import {
  getStoredPermissionStatus,
  setPermissionStatus,
} from "@/lib/permissions/platformPermissions";

export type MediaGateResult = {
  ok: boolean;
  stream?: MediaStream;
  error?: string;
};

function isMediaSupported(): boolean {
  return typeof window !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
}

export function stopMediaStream(stream: MediaStream | null | undefined): void {
  stream?.getTracks().forEach((track) => track.stop());
}

export async function requestLiveMedia(): Promise<MediaGateResult> {
  if (!isMediaSupported()) {
    return { ok: false, error: "Camera and microphone are not supported in this browser." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });
    setPermissionStatus("camera", "granted");
    setPermissionStatus("microphone", "granted");
    return { ok: true, stream };
  } catch {
    setPermissionStatus("camera", "denied");
    setPermissionStatus("microphone", "denied");
    return {
      ok: false,
      error: "Camera and microphone access was denied. Enable them in Settings → Device Permissions.",
    };
  }
}

export async function requestCameraPreview(): Promise<MediaGateResult> {
  if (!isMediaSupported()) {
    return { ok: false, error: "Camera is not supported in this browser." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    setPermissionStatus("camera", "granted");
    return { ok: true, stream };
  } catch {
    setPermissionStatus("camera", "denied");
    return {
      ok: false,
      error: "Camera access was denied. Enable it in Settings → Device Permissions.",
    };
  }
}

export async function requestVideoWithAudio(): Promise<MediaGateResult> {
  if (!isMediaSupported()) {
    return { ok: false, error: "Camera and microphone are not supported in this browser." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });
    setPermissionStatus("camera", "granted");
    setPermissionStatus("microphone", "granted");
    return { ok: true, stream };
  } catch {
    return {
      ok: false,
      error: "Camera and microphone access was denied. Check Settings → Device Permissions.",
    };
  }
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
