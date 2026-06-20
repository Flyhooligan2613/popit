import type { ReactNode } from "react";

/** Shared markup for favicon, Apple touch icon, and PWA manifest icons. */
export function AppIconMarkup(): ReactNode {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "78%",
          height: "78%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer lens ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0099FF 0%, #A855F7 35%, #FF4D6D 65%, #FF7A00 100%)",
            boxShadow: "0 0 48px rgba(255,77,109,0.55), 0 0 80px rgba(168,85,247,0.35)",
          }}
        />
        {/* Inner glass */}
        <div
          style={{
            position: "absolute",
            inset: "10%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #1a1a2e 0%, #050505 70%)",
            border: "2px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "42%",
              fontWeight: 900,
              color: "#FFFFFF",
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              textShadow: "0 0 20px rgba(255,255,255,0.4)",
            }}
          >
            P
          </span>
        </div>
        {/* Apostrophe bolt */}
        <div
          style={{
            position: "absolute",
            right: "14%",
            top: "18%",
            width: "8%",
            height: "22%",
            borderRadius: 4,
            background: "linear-gradient(180deg, #FF7A00 0%, #FF4D6D 100%)",
            boxShadow: "0 0 12px rgba(255,122,0,0.8)",
          }}
        />
      </div>
    </div>
  );
}
