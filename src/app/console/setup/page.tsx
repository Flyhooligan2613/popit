import { Suspense } from "react";
import AdminSetupPage from "./AdminSetupClient";

export default function SetupPage() {
  return (
    <Suspense fallback={<div className="admin-auth"><p className="admin-panel__loading">Loading setup…</p></div>}>
      <AdminSetupPage />
    </Suspense>
  );
}
