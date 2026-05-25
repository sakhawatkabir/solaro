"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
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
  const [confirmDelete, setConfirmDelete] = useState(null);

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
      setConfirmDelete(null);
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
    <>
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
            onDelete={(id) => {
              const product = products.find((p) => p.id === id);
              setConfirmDelete(product || id);
            }}
          />
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Product
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                {typeof confirmDelete === "object"
                  ? confirmDelete?.name
                  : "this product"}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const id =
                    typeof confirmDelete === "object"
                      ? confirmDelete.id
                      : confirmDelete;
                  deleteMutation.mutate(id);
                }}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteMutation.isPending ? (
                  <>
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
