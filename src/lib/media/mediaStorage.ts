const MEDIA_REFS_KEY = "popit:media-refs:v1";
const blobCache = new Map<string, string>();

type MediaRef = {
  dataUrl: string;
  mime: string;
  createdAt: number;
};

function loadRefs(): Record<string, MediaRef> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(MEDIA_REFS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, MediaRef>) : {};
  } catch {
    return {};
  }
}

function saveRefs(refs: Record<string, MediaRef>) {
  localStorage.setItem(MEDIA_REFS_KEY, JSON.stringify(refs));
}

export async function persistMediaBlob(blob: Blob): Promise<string> {
  const id = `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  if (blob.type.startsWith("video/")) {
    const url = URL.createObjectURL(blob);
    blobCache.set(id, url);
    return id;
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  blobCache.set(id, dataUrl);
  const refs = loadRefs();
  refs[id] = { dataUrl, mime: blob.type, createdAt: Date.now() };
  saveRefs(refs);
  return id;
}

export function getMediaUrl(mediaId: string | undefined): string | null {
  if (!mediaId) return null;
  if (blobCache.has(mediaId)) return blobCache.get(mediaId)!;

  const ref = loadRefs()[mediaId];
  if (ref) {
    blobCache.set(mediaId, ref.dataUrl);
    return ref.dataUrl;
  }

  return null;
}

export function revokeMediaUrl(mediaId: string) {
  const url = blobCache.get(mediaId);
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  blobCache.delete(mediaId);
}
