/** Isometric projection — ~35° immersion angle */
export const ISO = { tileW: 28, tileH: 14, height: 18, originX: 320, originY: 100 };

export function toIso(gx: number, gy: number, gz = 0) {
  const { tileW, tileH, height, originX, originY } = ISO;
  return {
    x: originX + (gx - gy) * (tileW / 2),
    y: originY + (gx + gy) * (tileH / 2) - gz * height,
  };
}

export type IsoPoint = { x: number; y: number };

export function isoTopFace(gx: number, gy: number, w: number, d: number, h: number): IsoPoint[] {
  return [
    toIso(gx, gy, h),
    toIso(gx + w, gy, h),
    toIso(gx + w, gy + d, h),
    toIso(gx, gy + d, h),
  ];
}

export function isoBoxFaces(
  gx: number,
  gy: number,
  w: number,
  d: number,
  h: number
) {
  const top = isoTopFace(gx, gy, w, d, h);
  const bl = toIso(gx, gy, 0);
  const br = toIso(gx + w, gy, 0);
  const fr = toIso(gx + w, gy + d, 0);
  const fl = toIso(gx, gy + d, 0);
  const tl = top[0];
  const tr = top[1];
  const frt = top[2];
  const flt = top[3];

  return {
    top,
    right: [br, fr, frt, tr],
    left: [bl, fl, flt, tl],
    front: [fl, fr, frt, flt],
  };
}

export function pointsToPath(pts: IsoPoint[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ") + " Z";
}

export function isoCenter(gx: number, gy: number, w: number, d: number, h: number) {
  return toIso(gx + w / 2, gy + d / 2, h);
}
