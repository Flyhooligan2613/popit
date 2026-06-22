import AdminShell from "@/components/admin/AdminShell";
import PlatformSetupPanel from "@/components/admin/PlatformSetupPanel";
import { getAdminSession } from "@/lib/admin/auth";

export default async function AdminPlatformPage() {
  const session = await getAdminSession();

  return (
    <AdminShell username={session?.sub}>
      <PlatformSetupPanel />
    </AdminShell>
  );
}
