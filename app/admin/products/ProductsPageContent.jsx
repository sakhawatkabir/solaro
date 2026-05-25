"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductsSummary,
  deleteProduct,
} from "@/app/actions/products";
import ProductsHeader from "./components/ProductsHeader";
import ProductsSummary from "./components/ProductsSummary";
import ProductsFilters from "./components/ProductsFilters";
import ProductsTable from "./components/ProductsTable";
import TableSkeleton from "../components/TableSkeleton";

const allStatuses = ["all", "ACTIVE", "DRAFT", "OUT_OF_STOCK"];

export default function ProductsPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "admin-products",
      currentPage,
      search,
      categoryFilter,
      statusFilter,
    ],
    queryFn: () =>
      getProducts(currentPage, perPage, search, categoryFilter, statusFilter),
    initialData:
      currentPage === 1 &&
      !search &&
      categoryFilter === "all" &&
      statusFilter === "all"
        ? initialData
        : undefined,
  });

  const { data: summaryData } = useQuery({
    queryKey: ["admin-products-summary"],
    queryFn: () => getProductsSummary(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products-summary"] });
    },
  });

  const products = productsData?.products || [];
  const pagination = productsData?.pagination || { totalPages: 0, total: 0 };
  const summary = summaryData || {
    totalStock: 0,
    totalSales: 0,
    allProducts: [],
  };

  const categories = [
    "all",
    ...new Set(summary.allProducts.map((p) => p.category)),
  ];

  return (
    <div className="space-y-6">
      <ProductsHeader
        totalProducts={pagination.total}
        totalStock={summary.totalStock}
        totalSales={summary.totalSales}
      />

      <ProductsSummary
        products={summary.allProducts}
        totalStock={summary.totalStock}
      />

      <ProductsFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        categoryFilter={categoryFilter}
        onCategoryChange={(val) => {
          setCategoryFilter(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
        allCategories={categories}
        allStatuses={allStatuses}
      />

      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <ProductsTable
          products={products}
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
