import { detectAndSaveCity, saveTimezoneFallbackCity } from "@/lib/location/cityDetection";

export type PlatformPermissionId =
  | "location"
  | "camera"
  | "photos"
  | "microphone"
  | "notifications";

export type PlatformPermissionStatus =
  | "granted"
  | "denied"
  | "prompt"
  | "unsupported"
  | "deferred";

const STORAGE_KEY = "popit:permissions";

export type StoredPermissions = Partial<Record<PlatformPermissionId, PlatformPermissionStatus>>;

function readStored(): StoredPermissions {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredPermissions) : {};
  } catch {
    return {};
  }
}

function writeStored(next: StoredPermissions) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStored(), ...next }));
}

export function getStoredPermissionStatus(id: PlatformPermissionId): PlatformPermissionStatus | null {
  return readStored()[id] ?? null;
}

function stopStream(stream: MediaStream | null | undefined) {
  stream?.getTracks().forEach((track) => track.stop());
}

async function requestCamera(): Promise<PlatformPermissionStatus> {
  if (!navigator.mediaDevices?.getUserMedia) return "unsupported";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    stopStream(stream);
    return "granted";
  } catch {
    return "denied";
  }
}

async function requestMicrophone(): Promise<PlatformPermissionStatus> {
  if (!navigator.mediaDevices?.getUserMedia) return "unsupported";
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    stopStream(stream);
    return "granted";
  } catch {
    return "denied";
  }
}

/** Camera + mic together — best for Go Live onboarding */
async function requestCameraAndMicrophone(): Promise<{
  camera: PlatformPermissionStatus;
  microphone: PlatformPermissionStatus;
}> {
  if (!navigator.mediaDevices?.getUserMedia) {
    return { camera: "unsupported", microphone: "unsupported" };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    stopStream(stream);
    return { camera: "granted", microphone: "granted" };
  } catch {
    const camera = await requestCamera();
    const microphone = await requestMicrophone();
    return { camera, microphone };
  }
}

async function requestNotifications(): Promise<PlatformPermissionStatus> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  try {
    const result = await Notification.requestPermission();
    if (result === "granted") return "granted";
    if (result === "denied") return "denied";
    return "prompt";
  } catch {
    return "denied";
  }
}

/**
 * Gallery access on the web is requested at pick time — no OS-level photos permission.
 * Opening a file picker once marks intent as granted/deferred.
 */
export async function requestPhotosViaPicker(): Promise<PlatformPermissionStatus> {
  if (typeof window === "undefined") return "unsupported";

  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.multiple = false;
    input.style.display = "none";

    let settled = false;
    const finish = (status: PlatformPermissionStatus) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(status);
    };

    const cleanup = () => {
      window.removeEventListener("focus", onWindowFocus);
      input.remove();
    };

    const onWindowFocus = () => {
      window.setTimeout(() => {
        if (!input.files?.length) finish("deferred");
      }, 320);
    };

    input.addEventListener("change", () => {
      finish(input.files?.length ? "granted" : "deferred");
    });

    window.addEventListener("focus", onWindowFocus);
    document.body.appendChild(input);
    input.click();
  });
}

export async function requestPlatformPermission(
  id: PlatformPermissionId
): Promise<PlatformPermissionStatus> {
  let status: PlatformPermissionStatus = "unsupported";

  switch (id) {
    case "location": {
      const result = await detectAndSaveCity({ prompt: true });
      status = result.source === "gps" ? "granted" : "deferred";
      break;
    }
    case "camera": {
      const both = await requestCameraAndMicrophone();
      writeStored({ camera: both.camera, microphone: both.microphone });
      return both.camera;
    }
    case "microphone": {
      const stored = readStored();
      if (stored.camera === "granted" && stored.microphone === "granted") return "granted";
      status = await requestMicrophone();
      break;
    }
    case "photos":
      status = await requestPhotosViaPicker();
      break;
    case "notifications":
      status = await requestNotifications();
      break;
    default:
      status = "unsupported";
  }

  writeStored({ [id]: status });
  return status;
}

export async function requestAllPlatformPermissions(): Promise<StoredPermissions> {
  const locationResult = await detectAndSaveCity({ prompt: true });
  const location: PlatformPermissionStatus =
    locationResult.source === "gps" ? "granted" : "deferred";

  const { camera, microphone } = await requestCameraAndMicrophone();
  const notifications = await requestNotifications();

  // Photos uses a picker — defer unless user selects files on the card
  const photos: PlatformPermissionStatus = "deferred";

  const result: StoredPermissions = {
    location,
    camera,
    microphone,
    notifications,
    photos,
  };

  writeStored(result);
  return result;
}

export function skipLocationPermissionFallback() {
  saveTimezoneFallbackCity();
}

export { markLocationPromptSeen } from "@/lib/location/cityDetection";
