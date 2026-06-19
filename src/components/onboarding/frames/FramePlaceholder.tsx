type FramePlaceholderProps = {
  label: string;
  onNext?: () => void;
};

export default function FramePlaceholder({ label, onNext }: FramePlaceholderProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        color: "#FFFFFF",
      }}
    >
      <span>{label}</span>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          style={{
            padding: "0.5rem 1rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "4px",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
