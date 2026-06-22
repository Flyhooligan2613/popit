import Link from "next/link";

type LegalDocumentProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export default function LegalDocument({ title, updated, children }: LegalDocumentProps) {
  return (
    <div className="legal-doc">
      <header className="legal-doc__header">
        <Link href="/legal" className="legal-doc__back">
          ← Legal
        </Link>
        <h1 className="legal-doc__title">{title}</h1>
        <p className="legal-doc__updated">Last updated: {updated}</p>
      </header>
      <article className="legal-doc__body">{children}</article>
      <footer className="legal-doc__footer">
        <p>
          Questions? Contact{" "}
          <a href="mailto:legal@getpopit.com" className="legal-doc__link">
            legal@getpopit.com
          </a>
        </p>
        <p className="legal-doc__disclaimer">
          This document is provided for platform compliance and user transparency. It is not legal
          advice.
        </p>
      </footer>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="legal-doc__section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
