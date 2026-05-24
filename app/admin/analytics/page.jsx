import { getAnalytics } from "@/app/actions/analytics";
import AnalyticsPageContent from "./AnalyticsPageContent";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const initialData = await getAnalytics();

  return <AnalyticsPageContent initialData={initialData} />;
}
