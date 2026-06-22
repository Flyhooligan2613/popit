import "../../legal/legal.css";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <div className="help-scroll-shell main-page-scroll app-page-pad">{children}</div>;
}
