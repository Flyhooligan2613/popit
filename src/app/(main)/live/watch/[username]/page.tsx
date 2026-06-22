import LiveWatchScreen from "@/components/create/LiveWatchScreen";

export default async function LiveWatchPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <LiveWatchScreen username={username} />;
}
