"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDistricts, deleteDistrict } from "@/app/actions/districts";
import DistrictsHeader from "./components/DistrictsHeader";
import DistrictsFilters from "./components/DistrictsFilters";
import DistrictsTable from "./components/DistrictsTable";
import TableSkeleton from "../components/TableSkeleton";

const divisions = [
  "all",
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];
const coverageOptions = ["all", "covered", "uncovered"];

export default function DistrictsPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [coverageFilter, setCoverageFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const isDefaultView =
    currentPage === 1 &&
    !search &&
    divisionFilter === "all" &&
    coverageFilter === "all";

  const { data: districtsData, isLoading } = useQuery({
    queryKey: [
      "admin-districts",
      currentPage,
      search,
      divisionFilter,
      coverageFilter,
    ],
    queryFn: () =>
      getDistricts(
        currentPage,
        perPage,
        search,
        divisionFilter,
        coverageFilter,
      ),
    initialData: isDefaultView ? initialData : undefined,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDistrict(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-districts"] });
    },
  });

  const districts = districtsData?.districts || [];
  const pagination = districtsData?.pagination || { totalPages: 0, total: 0 };

  return (
    <div className="space-y-6">
      <DistrictsHeader totalDistricts={pagination.total} />

      <DistrictsFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        divisionFilter={divisionFilter}
        onDivisionChange={(val) => {
          setDivisionFilter(val);
          setCurrentPage(1);
        }}
        coverageFilter={coverageFilter}
        onCoverageChange={(val) => {
          setCoverageFilter(val);
          setCurrentPage(1);
        }}
        allDivisions={divisions}
        allCoverageOptions={coverageOptions}
      />

      {isLoading ? (
        <TableSkeleton rows={5} cols={5} />
      ) : (
        <DistrictsTable
          districts={districts}
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
