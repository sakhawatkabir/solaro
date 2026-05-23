"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/app/actions/analytics";
import AnalyticsOverview from "./components/AnalyticsOverview";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AnalyticsTables from "./components/AnalyticsTables";
import FormSkeleton from "../components/FormSkeleton";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => getAnalytics(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <FormSkeleton fields={4} />;
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Overview of your business metrics
        </p>
      </div>

      <AnalyticsOverview data={data.overview} />
      <AnalyticsCharts data={data} />
      <AnalyticsTables data={data} />
    </div>
  );
}
