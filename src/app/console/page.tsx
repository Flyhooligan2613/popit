import { redirect } from "next/navigation";
import { getAdminConsolePath } from "@/lib/admin/constants";

export default function ConsoleIndexPage() {
  redirect(getAdminConsolePath("/dashboard"));
}
