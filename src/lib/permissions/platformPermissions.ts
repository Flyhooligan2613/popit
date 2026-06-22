import { getPopitLocation, markLocationPromptSeen, saveTimezoneFallbackCity } from "@/lib/location/zipLocation";

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

export const PERMISSIONS_UPDATED_EVENT = "popit:permissionsUpdated";

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
  window.dispatchEvent(new Event(PERMISSIONS_UPDATED_EVENT));
}

export function getStoredPermissionStatus(id: PlatformPermissionId): PlatformPermissionStatus | null {
  return readStored()[id] ?? null;
}

export function getAllStoredPermissions(): StoredPermissions {
  return readStored();
}

export function setPermissionStatus(id: PlatformPermissionId, status: PlatformPermissionStatus) {
  writeStored({ [id]: status });
}

function stopStream(stream: MediaStream | null | undefined) {
  stream?.getTracks().forEach((track) => track.stop());
}

async function syncNotificationsFromBrowser(): Promise<PlatformPermissionStatus | null> {
  if (typeof window === "undefined" || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return "prompt";
}

export async function syncPermissionsFromBrowser(): Promise<StoredPermissions> {
  const current = readStored();
  const notifications = await syncNotificationsFromBrowser();
  const next: StoredPermissions = { ...current };
  if (notifications) next.notifications = notifications;
  writeStored(next);
  return next;
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
      const loc = getPopitLocation();
      status = loc?.zipCode ? "granted" : "deferred";
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

export function disablePlatformPermission(id: PlatformPermissionId) {
  if (id === "location") {
    writeStored({ location: "deferred" });
    return;
  }
  if (id === "camera") {
    writeStored({ camera: "deferred", microphone: "deferred" });
    return;
  }
  if (id === "microphone") {
    writeStored({ microphone: "deferred" });
    return;
  }
  writeStored({ [id]: "deferred" });
}

export function skipPhotosSharing() {
  writeStored({ photos: "deferred" });
}

export async function togglePlatformPermission(
  id: PlatformPermissionId,
  currentlyGranted: boolean
): Promise<PlatformPermissionStatus> {
  if (currentlyGranted) {
    disablePlatformPermission(id);
    return getStoredPermissionStatus(id) ?? "deferred";
  }
  return requestPlatformPermission(id);
}

export async function requestAllPlatformPermissions(): Promise<StoredPermissions> {
  const loc = getPopitLocation();
  const location: PlatformPermissionStatus = loc?.zipCode ? "granted" : "deferred";

  const { camera, microphone } = await requestCameraAndMicrophone();
  const notifications = await requestNotifications();
  const photos: PlatformPermissionStatus = readStored().photos ?? "deferred";

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

export { markLocationPromptSeen } from "@/lib/location/zipLocation";

export function isPermissionGranted(status: PlatformPermissionStatus | null | undefined): boolean {
  return status === "granted";
}

export function permissionStatusLabel(status: PlatformPermissionStatus | null | undefined): string {
  if (status === "granted") return "On";
  if (status === "denied") return "Denied";
  if (status === "deferred") return "Off";
  if (status === "unsupported") return "N/A";
  if (status === "prompt") return "Off";
  return "Off";
}
