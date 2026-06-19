"use client";

import { memo } from "react";
import PopitLens from "./PopitLens";

export function PopitLensRow({
  names,
  accent,
}: {
  names: string[];
  accent: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {names.map((name, i) => (
        <PopitLens
          key={name}
          name={name}
          followers={1200 + i * 480}
          creatorLevel={3 + (i % 5)}
          influence={35 + i * 18}
          accent={accent}
          size={48}
          followersBeneath={false}
          live={i === 0}
        />
      ))}
    </div>
  );
}

export default memo(PopitLensRow);
