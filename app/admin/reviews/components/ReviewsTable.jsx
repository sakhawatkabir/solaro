"use client";

import { useState } from "react";
import { Star, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import TablePagination from "../../components/TablePagination";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const statusColors = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ReviewsTable({
  reviews,
  currentPage,
  totalPages,
  perPage,
  totalFiltered,
  onPageChange,
  onStatusChange,
  onDelete,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Rating
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Comment
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Date
              </th>
              <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {reviews.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-zinc-500"
                >
                  <Star className="size-10 mx-auto mb-3 text-zinc-700" />
                  <p className="text-sm">No reviews found</p>
                </td>
              </tr>
            ) : (
              reviews.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-white font-medium">
                        {review.customerName}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {review.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-zinc-700"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-zinc-400 ml-1">
                        {review.rating}
                      </span>
                    </div>
                    {review.title && (
                      <div className="text-xs text-zinc-300 mt-1 truncate max-w-[150px]">
                        {review.title}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-zinc-300 max-w-xs truncate">
                      {review.comment}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
                        statusColors[review.status]
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-xs text-zinc-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {review.status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              onStatusChange(review.id, "APPROVED")
                            }
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="size-4" />
                          </button>
                          <button
                            onClick={() =>
                              onStatusChange(review.id, "REJECTED")
                            }
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="size-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === review.id ? null : review.id,
                          )
                        }
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="View full comment"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(review)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalFiltered={totalFiltered}
          onPageChange={onPageChange}
        />
      )}

      {/* Expanded Comment Modal */}
      {expandedId && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          role="button"
          tabIndex={0}
          onClick={() => setExpandedId(null)}
          onKeyDown={(e) => e.key === "Escape" && setExpandedId(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-lg w-full"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const review = reviews.find((r) => r.id === expandedId);
              if (!review) return null;
              return (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Review Details
                    </h3>
                    <button
                      onClick={() => setExpandedId(null)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <XCircle className="size-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400">Customer</p>
                      <p className="text-white font-medium">
                        {review.customerName}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {review.customerEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Rating</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <div>
                        <p className="text-sm text-zinc-400">Title</p>
                        <p className="text-white">{review.title}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-zinc-400">Comment</p>
                      <p className="text-zinc-300 whitespace-pre-wrap mt-1">
                        {review.comment}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                      <span className="text-xs text-zinc-500">
                        {formatDate(review.createdAt)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border ${
                          statusColors[review.status]
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Review
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
              Are you sure you want to delete this review from{" "}
              <span className="text-white font-medium">
                {confirmDelete.customerName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(confirmDelete.id);
                  setConfirmDelete(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors flex items-center gap-2"
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
