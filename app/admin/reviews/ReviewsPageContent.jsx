"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewsHeader from "./components/ReviewsHeader";
import ReviewsFilters from "./components/ReviewsFilters";
import ReviewsTable from "./components/ReviewsTable";
import TableSkeleton from "../components/TableSkeleton";
import {
  getReviews,
  updateReviewStatus,
  deleteReview,
} from "@/app/actions/reviews";

const allStatuses = ["all", "PENDING", "APPROVED", "REJECTED"];
const allRatings = ["all", "5", "4", "3", "2", "1"];

export default function ReviewsPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const isDefaultView =
    currentPage === 1 &&
    !search &&
    statusFilter === "all" &&
    ratingFilter === "all";

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: [
      "admin-reviews",
      currentPage,
      search,
      statusFilter,
      ratingFilter,
    ],
    queryFn: () =>
      getReviews({
        page: currentPage,
        perPage,
        search,
        status: statusFilter,
        rating: ratingFilter,
      }),
    initialData: isDefaultView ? initialData : undefined,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateReviewStatus({ id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteReview(id),
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
