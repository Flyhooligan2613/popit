"use client";

import { type ReactNode } from "react";

export function SettingsPanelShell({
  title,
  children,
  onSave,
  saveLabel = "Save changes",
  saving,
  saved,
}: {
  title: string;
  children: ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  saving?: boolean;
  saved?: boolean;
}) {
  return (
    <div className="settings-panel">
      <p className="settings-panel__title">{title}</p>
      <div className="settings-panel__body">{children}</div>
      {onSave && (
        <button
          type="button"
          className="settings-panel__save"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? "Saving…" : saved ? "Saved" : saveLabel}
        </button>
      )}
    </div>
  );
}

export function SettingsField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="settings-field">
      <span className="settings-field__label">{label}</span>
      {hint && <span className="settings-field__hint">{hint}</span>}
      {children}
    </label>
  );
}

export function SettingsInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`settings-field__input ${props.className ?? ""}`} />;
}

export function SettingsTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`settings-field__textarea ${props.className ?? ""}`} />;
}

export function SettingsSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`settings-field__select ${props.className ?? ""}`} />;
}

export function SettingsToggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="settings-toggle">
      <div className="settings-toggle__copy">
        <span className="settings-toggle__label">{label}</span>
        {hint && <span className="settings-toggle__hint">{hint}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`settings-toggle__btn ${checked ? "is-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="settings-toggle__knob" />
      </button>
    </div>
  );
}

export function SettingsChipGroup({
  options,
  selected,
  onChange,
  multi = false,
}: {
  options: { id: string; label: string }[];
  selected: string | string[];
  onChange: (next: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (id: string) =>
    multi ? (selected as string[]).includes(id) : selected === id;

  const toggle = (id: string) => {
    if (multi) {
      const list = selected as string[];
      onChange(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    } else {
      onChange(id);
    }
  };

  return (
    <div className="settings-chip-group">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`settings-chip ${isSelected(opt.id) ? "is-active" : ""}`}
          onClick={() => toggle(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
