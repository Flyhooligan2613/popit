export const SITE_URL = "https://www.getpopit.com";
export const OG_IMAGE_PATH = "/icons/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = "POP'IT camera lens";

/** Set NEXT_PUBLIC_FACEBOOK_APP_ID in Vercel for fb:app_id (Sharing Debugger). */
export function getFacebookAppId(): string | null {
  const id =
    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim() ||
    process.env.FACEBOOK_APP_ID?.trim();
  return id || null;
}
