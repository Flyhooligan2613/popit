import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/admin/auth";

export default async function AdminModerationPage() {
  const session = await getAdminSession();

  return (
    <AdminShell username={session?.sub}>
      <div className="admin-panel">
        <header className="admin-panel__head">
          <h1>Moderation</h1>
          <p>Content safety controls and review queue — expand with Supabase reports when connected.</p>
        </header>

        <section className="admin-panel__section">
          <h2>Policy enforcement</h2>
          <ul className="admin-checklist">
            <li>Community Guidelines violations → restrict account or remove content</li>
            <li>Copyright strikes on live/music → disable streaming for user</li>
            <li>Spam or fake engagement → remove from monetization program</li>
            <li>Underage or impersonation → suspend pending verification</li>
          </ul>
        </section>

        <section className="admin-panel__section">
          <h2>Reports queue</h2>
          <p className="admin-panel__loading">
            No reports synced yet. Connect Supabase service role for live moderation data.
          </p>
        </section>
      </div>
    </AdminShell>
  );
}
