import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin/auth";
import { getAdminConsoleSlug } from "@/lib/admin/constants";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const slug = getAdminConsoleSlug();

  return (
    <AdminShell username={session?.sub}>
      <div className="admin-panel">
        <header className="admin-panel__head">
          <h1>Overview</h1>
          <p>Internal operations dashboard. Not visible to regular users.</p>
        </header>

        <div className="admin-stat-grid">
          <div className="admin-stat">
            <strong>Ops</strong>
            <span>Console active</span>
          </div>
          <div className="admin-stat">
            <strong>/{slug}</strong>
            <span>Secret path</span>
          </div>
          <div className="admin-stat">
            <strong>8h</strong>
            <span>Session TTL</span>
          </div>
        </div>

        <section className="admin-panel__section">
          <h2>Quick actions</h2>
          <ul className="admin-checklist">
            <li>Configure feature flags under Platform Setup</li>
            <li>Enable maintenance mode before major deploys</li>
            <li>Review moderation queue for reported content</li>
            <li>Rotate admin credentials in your deployment env vars</li>
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
