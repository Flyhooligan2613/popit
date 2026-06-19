import { notFound } from "next/navigation";
import BusinessDashboard from "@/components/business/BusinessDashboard";
import { getBusinessBySlug } from "@/lib/city/businesses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessDashboardPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();
  return <BusinessDashboard business={business} />;
}
