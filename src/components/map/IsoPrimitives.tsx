"use client";

import { memo } from "react";
import { isoBoxFaces, pointsToPath, toIso } from "./isometric";

type IsoBlockProps = {
  gx: number;
  gy: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
};

export function IsoBlock({ gx, gy, w, d, h, top, left, right, stroke = "rgba(255,255,255,0.06)" }: IsoBlockProps) {
  const faces = isoBoxFaces(gx, gy, w, d, h);
  return (
    <g>
      <path d={pointsToPath(faces.left)} fill={left} stroke={stroke} strokeWidth="0.4" />
      <path d={pointsToPath(faces.right)} fill={right} stroke={stroke} strokeWidth="0.4" />
      <path d={pointsToPath(faces.top)} fill={top} stroke={stroke} strokeWidth="0.5" />
    </g>
  );
}

export function IsoGroundTile({
  gx,
  gy,
  w,
  d,
  fill,
}: {
  gx: number;
  gy: number;
  w: number;
  d: number;
  fill: string;
}) {
  const faces = isoBoxFaces(gx, gy, w, d, 0.02);
  return <path d={pointsToPath(faces.top)} fill={fill} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />;
}

export function IsoTree({ gx, gy }: { gx: number; gy: number }) {
  const base = toIso(gx + 0.5, gy + 0.5, 0);
  const top = toIso(gx + 0.5, gy + 0.5, 0.5);
  return (
    <g>
      <line x1={base.x} y1={base.y} x2={top.x} y2={top.y} stroke="#2D5A3D" strokeWidth="1.5" />
      <circle cx={top.x} cy={top.y - 4} r={5} fill="#1E4D32" opacity="0.8" />
    </g>
  );
}

export default memo(IsoBlock);
