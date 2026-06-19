import { notFound } from "next/navigation";
import BusinessDestination from "@/components/business/BusinessDestination";
import { getBusinessBySlug } from "@/lib/city/businesses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return <BusinessDestination business={business} />;
}
