import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin/auth";
import { getAdminConsoleSlug } from "@/lib/admin/constants";
import Link from "next/link";

export default async function AdminSecurityPage() {
  const session = await getAdminSession();
  const slug = getAdminConsoleSlug();

  return (
    <AdminShell username={session?.sub}>
      <div className="admin-panel">
        <header className="admin-panel__head">
          <h1>Security & Access</h1>
          <p>Keep this console secret. Do not link it from the consumer app.</p>
        </header>

        <section className="admin-panel__section">
          <h2>Required environment variables</h2>
          <ul className="admin-checklist">
            <li>
              <code>ADMIN_USERNAME</code> — admin login username
            </li>
            <li>
              <code>ADMIN_PASSWORD</code> — strong password (never commit)
            </li>
            <li>
              <code>ADMIN_SESSION_SECRET</code> — random 32+ char signing secret
            </li>
            <li>
              <code>ADMIN_CONSOLE_SLUG</code> — custom secret URL (current: <code>{slug}</code>)
            </li>
            <li>
              <code>ADMIN_SETUP_KEY</code> — optional one-time bootstrap key for setup page
            </li>
          </ul>
        </section>

        <section className="admin-panel__section">
          <h2>Secret URL</h2>
          <p className="admin-panel__loading">
            Console: <code>https://www.getpopit.com/{slug}/login</code>
          </p>
          <p className="admin-panel__meta">
            Change <code>ADMIN_CONSOLE_SLUG</code> in production to something unguessable.
          </p>
        </section>

        <section className="admin-panel__section">
          <h2>First-time setup</h2>
          <p className="admin-panel__loading">
            Visit the setup wizard with your bootstrap key after deploying env vars.
          </p>
          <Link href={`/${slug}/setup`} className="admin-console__nav-link" style={{ display: "inline-block" }}>
            Open setup wizard →
          </Link>
        </section>
      </div>
    </AdminShell>
  );
}
