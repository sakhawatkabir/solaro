"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLeads, deleteLead } from "@/app/actions/leads";
import LeadsHeader from "./components/LeadsHeader";
import LeadsFilters from "./components/LeadsFilters";
import LeadsTable from "./components/LeadsTable";

const allStatuses = [
  "all",
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
];
const allSources = [
  "all",
  "WEBSITE",
  "REFERRAL",
  "SOCIAL_MEDIA",
  "GOOGLE_ADS",
  "FACEBOOK_ADS",
  "PHONE_CALL",
  "WALK_IN",
  "OTHER",
];
const allPriorities = ["all", "LOW", "MEDIUM", "HIGH", "URGENT"];

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: leadsData, isLoading } = useQuery({
    queryKey: [
      "admin-leads",
      currentPage,
      search,
      statusFilter,
      sourceFilter,
      priorityFilter,
    ],
    queryFn: () =>
      getLeads(
        currentPage,
        perPage,
        search,
        statusFilter,
        sourceFilter,
        priorityFilter,
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-leads"]);
    },
  });

  const leads = leadsData?.leads || [];
  const pagination = leadsData?.pagination || { totalPages: 0, total: 0 };

  return (
    <div className="space-y-6">
      <LeadsHeader totalLeads={pagination.total} />

      <LeadsFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
        sourceFilter={sourceFilter}
        onSourceChange={(val) => {
          setSourceFilter(val);
          setCurrentPage(1);
        }}
        priorityFilter={priorityFilter}
        onPriorityChange={(val) => {
          setPriorityFilter(val);
          setCurrentPage(1);
        }}
        allStatuses={allStatuses}
        allSources={allSources}
        allPriorities={allPriorities}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      ) : (
        <LeadsTable
          leads={leads}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          perPage={perPage}
          totalFiltered={pagination.total}
          onPageChange={setCurrentPage}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}
