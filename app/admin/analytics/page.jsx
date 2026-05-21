"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/app/actions/analytics";
import AnalyticsOverview from "./components/AnalyticsOverview";
import AnalyticsCharts from "./components/AnalyticsCharts";
import AnalyticsTables from "./components/AnalyticsTables";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => getAnalytics(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
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
