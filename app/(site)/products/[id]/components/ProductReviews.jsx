"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { m } from "framer-motion";
import { Star, CheckCircle, Lock } from "lucide-react";
import Link from "next/link";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
}

export default function ProductReviews({ productId }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    title: "",
  });

  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
  });

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => {
      const res = await fetch(
        `/api/reviews?status=APPROVED&productId=${productId}&limit=50`,
      );
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit review");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", productId],
      });
      setSubmitted(true);
      setSubmitError("");
      setShowForm(false);
      setFormData({ name: "", email: "", rating: 5, comment: "", title: "" });
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (err) => {
      setSubmitError(err.message);
    },
  });

  const reviews = reviewsData?.reviews || [];
  const stats = reviewsData?.stats || { avgRating: 0, totalReviews: 0 };
  const user = sessionData?.user;
  const isLoggedIn = sessionData?.authenticated;

  const avgRating = stats.avgRating?.toFixed(1) || "0.0";
  const totalReviews = stats.totalReviews || 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    const payload = {
      customerName: formData.name || user?.name,
      customerEmail: formData.email || user?.email,
      rating: formData.rating,
      comment: formData.comment,
      title: formData.title || null,
      productId,
    };
    console.log("Submitting review:", payload);
    submitMutation.mutate(payload);
  };

  const handleWriteReview = () => {
    if (!isLoggedIn) return;
    setShowForm(true);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  };

  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-ink mb-8">
          Customer Reviews
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-2xl p-8 border border-ink/5">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-ink mb-2">
                {avgRating}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill={
                      star <= Math.round(parseFloat(avgRating))
                        ? "#FBBF24"
                        : "none"
                    }
                    className={
                      star <= Math.round(parseFloat(avgRating))
                        ? "text-yellow-400"
                        : "text-ink/20"
                    }
                  />
                ))}
              </div>
              <div className="text-ink-mid">{totalReviews} reviews</div>
            </div>

            <div className="space-y-2">
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-ink-mid w-3">{star}</span>
                  <Star size={14} className="text-yellow-400" fill="#FBBF24" />
                  <div className="flex-1 h-2 bg-ink/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{
                        width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-ink-mid w-6">{count}</span>
                </div>
              ))}
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleWriteReview}
                className="w-full mt-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors"
              >
                Write a Review
              </button>
            ) : (
              <Link
                href={`/login?callbackUrl=/products/${productId}`}
                className="w-full mt-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                Login to Review
              </Link>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            {submitted && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
              >
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-green-700 font-medium">
                  Thank you! Your review will appear after approval.
                </span>
              </m.div>
            )}

            {showForm && isLoggedIn && (
              <ReviewForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
                isSubmitting={submitMutation.isPending}
              />
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-ink/5 animate-pulse"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-10 rounded-full bg-ink/5" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-ink/5 rounded" />
                        <div className="h-3 w-16 bg-ink/5 rounded" />
                      </div>
                    </div>
                    <div className="h-4 w-full bg-ink/5 rounded mb-2" />
                    <div className="h-4 w-3/4 bg-ink/5 rounded" />
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-ink/5 text-center">
                <Star size={40} className="text-ink/20 mx-auto mb-3" />
                <p className="text-ink-mid font-medium">No reviews yet</p>
                <p className="text-ink-light text-sm mt-1">
                  {isLoggedIn
                    ? "Be the first to share your experience with this product."
                    : "Login to be the first to review this product."}
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={{
                    ...review,
                    date: formatDate(review.createdAt),
                    verified: false,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
