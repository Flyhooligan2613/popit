"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  style,
  autoComplete,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="password-input"
      style={{
        display: "flex",
        alignItems: "center",
        width: style?.width ?? "100%",
        minHeight: 52,
        borderRadius: style?.borderRadius ?? 14,
        border: style?.border ?? "1px solid rgba(255,255,255,0.09)",
        background: style?.background ?? "rgba(255,255,255,0.055)",
        boxSizing: "border-box",
      }}
    >
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="password-input__field"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "15px 8px 15px 18px",
          border: "none",
          background: "transparent",
          outline: "none",
          color: style?.color ?? "#fff",
          fontFamily: style?.fontFamily ?? "system-ui, sans-serif",
          fontSize: style?.fontSize ?? "16px",
          boxSizing: "border-box",
          WebkitAppearance: "none",
        }}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="password-input__toggle"
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          marginRight: 4,
          border: "none",
          borderRadius: 10,
          background: "rgba(255,255,255,0.08)",
          color: visible ? "#FF4D6D" : "rgba(255,255,255,0.85)",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
      >
        {visible ? (
          <EyeOff size={20} strokeWidth={2} aria-hidden />
        ) : (
          <Eye size={20} strokeWidth={2} aria-hidden />
        )}
      </button>
    </div>
  );
}
