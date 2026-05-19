"use client";

import { useState } from "react";
import { leads } from "@/app/admin/data/mock";
import LeadsHeader from "./components/LeadsHeader";
import LeadsPipeline from "./components/LeadsPipeline";
import LeadsFilters from "./components/LeadsFilters";
import LeadsTable from "./components/LeadsTable";
import TablePagination from "@/app/admin/components/TablePagination";

const statusOrder = ["new", "contacted", "quoted", "converted", "lost"];

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = leads.filter((lead) => {
    const matchSearch =
      search === "" ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchSource = sourceFilter === "all" || lead.source === sourceFilter;
    return matchSearch && matchStatus && matchSource;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const statusCounts = statusOrder.map((s) => ({
    status: s,
    count: leads.filter((l) => l.status === s).length,
  }));

  const totalLeads = leads.length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="space-y-6">
      <LeadsHeader totalLeads={totalLeads} convertedCount={convertedCount} />

      <LeadsPipeline
        statusCounts={statusCounts}
        activeFilter={statusFilter}
        onFilterChange={(status) => {
          setStatusFilter(status);
          resetPage();
        }}
      />

      <LeadsFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          resetPage();
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          resetPage();
        }}
        sourceFilter={sourceFilter}
        onSourceChange={(val) => {
          setSourceFilter(val);
          resetPage();
        }}
      />

      <LeadsTable leads={paginated} />

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={filtered.length}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
