"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLead, deleteLead } from "@/app/actions/leads";
import LeadDetailHeader from "./components/LeadDetailHeader";
import LeadInfoCard from "./components/LeadInfoCard";
import LeadPipelineStatus from "./components/LeadPipelineStatus";
import LeadDangerZone from "./components/LeadDangerZone";

export default function LeadDetailPage({ params }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: leadData, isLoading } = useQuery({
    queryKey: ["admin-lead", params.id],
    queryFn: () => getLead(params.id),
    enabled: !!params.id,
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLead(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      router.push("/admin/leads");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!leadData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <LeadDetailHeader lead={leadData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LeadInfoCard lead={leadData} />
          <LeadPipelineStatus lead={leadData} />
        </div>

        <div className="space-y-6">
          <LeadDangerZone
            onDelete={() => {
              if (confirm("Are you sure you want to delete this lead?")) {
                deleteMutation.mutate();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
