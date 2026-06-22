import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminConsoleSlug } from "@/lib/admin/constants";

export default function AdminLoginPage() {
  const slug = getAdminConsoleSlug();

  return (
    <div className="admin-auth">
      <div className="admin-auth__card">
        <p className="admin-auth__eyebrow">Internal access only</p>
        <h1 className="admin-auth__title">POP&apos;IT Ops Console</h1>
        <p className="admin-auth__sub">
          This URL is not linked in the app. Keep it private — like TikTok or Instagram internal tools.
        </p>
        <AdminLoginForm />
        <p className="admin-auth__foot">
          Console path: <code>/{slug}</code>
        </p>
      </div>
    </div>
  );
}
