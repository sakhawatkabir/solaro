"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewsHeader from "./components/ReviewsHeader";
import ReviewsFilters from "./components/ReviewsFilters";
import ReviewsTable from "./components/ReviewsTable";
import TableSkeleton from "../components/TableSkeleton";

const allStatuses = ["all", "PENDING", "APPROVED", "REJECTED"];
const allRatings = ["all", "5", "4", "3", "2", "1"];

export default function ReviewsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: [
      "admin-reviews",
      currentPage,
      search,
      statusFilter,
      ratingFilter,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        perPage,
        ...(search && { search }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(ratingFilter !== "all" && { rating: ratingFilter }),
      });
      const res = await fetch(`/api/admin/reviews?${params}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) =>
      fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" }).then((res) =>
        res.json(),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const reviews = reviewsData?.reviews || [];
  const total = reviewsData?.pagination?.total || 0;
  const totalPages = reviewsData?.pagination?.totalPages || 1;

  const statusCounts =
    reviewsData?.statusBreakdown?.map((s) => ({
      status: s.status,
      count: s._count._all,
    })) || [];

  return (
    <div className="space-y-6">
      <ReviewsHeader totalReviews={total} />

      <ReviewsFilters
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
        ratingFilter={ratingFilter}
        onRatingChange={(val) => {
          setRatingFilter(val);
          setCurrentPage(1);
        }}
        allStatuses={allStatuses}
        allRatings={allRatings}
      />

      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : (
        <ReviewsTable
          reviews={reviews}
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={total}
          onPageChange={setCurrentPage}
          onStatusChange={(id, status) => updateMutation.mutate({ id, status })}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
}
