"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
}) {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalFiltered);

  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const result = [1];

    if (currentPage > 3) {
      result.push("ellipsis");
    }

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      result.push(i);
    }

    if (currentPage < totalPages - 2) {
      result.push("ellipsis");
    }

    result.push(totalPages);
    return result;
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-zinc-800">
      <p className="text-sm text-zinc-400">
        Showing {start}–{end} of {totalFiltered}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={i === 1 ? "ellipsis-start" : "ellipsis-end"}
              className="size-8 flex items-center justify-center text-sm text-zinc-500"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(page)}
              className={`size-8 p-0 text-sm font-medium ${
                currentPage === page
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
