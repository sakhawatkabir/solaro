"use client";

import { useState } from "react";
import { products as mockProducts } from "../data/mock";
import ProductsHeader from "./components/ProductsHeader";
import ProductsSummary from "./components/ProductsSummary";
import ProductsFilters from "./components/ProductsFilters";
import ProductsTable from "./components/ProductsTable";

const allStatuses = ["all", "active", "draft", "out-of-stock"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const allCategories = [
    "all",
    ...new Set(mockProducts.map((p) => p.category)),
  ];

  const filtered = mockProducts.filter((product) => {
    const matchSearch =
      search === "" ||
      product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0);
  const totalSales = mockProducts.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="space-y-6">
      <ProductsHeader
        totalProducts={mockProducts.length}
        totalStock={totalStock}
        totalSales={totalSales}
      />

      <ProductsSummary products={mockProducts} totalStock={totalStock} />

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
        allCategories={allCategories}
        allStatuses={allStatuses}
      />

      <ProductsTable
        products={paginated}
        currentPage={currentPage}
        totalPages={totalPages}
        perPage={perPage}
        totalFiltered={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
