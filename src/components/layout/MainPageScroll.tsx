"use client";

import PopitPageWatermark from "@/components/welcome/PopitPageWatermark";

type MainPageScrollProps = {
  children: React.ReactNode;
  className?: string;
};

/** Full-height scroll shell with POP'IT background mark visible beneath content. */
export default function MainPageScroll({ children, className = "" }: MainPageScrollProps) {
  return (
    <div className={`main-page-scroll app-page-pad ${className}`.trim()}>
      <PopitPageWatermark />
      <div className="main-page-scroll__body">{children}</div>
    </div>
  );
}
