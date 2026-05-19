"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahim Ahmed",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent system! Installed in my home in Dhaka. Already seeing significant reduction in electricity bills. The installation team was professional and completed everything in one day.",
      verified: true,
    },
    {
      id: 2,
      name: "Fatima Khan",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great value for money. The panels work well even during cloudy days. Only minor issue was a slight delay in delivery, but customer service was responsive.",
      verified: true,
    },
    {
      id: 3,
      name: "Karim Hassan",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Best investment for my home in Chittagong. Net metering setup was seamless. Highly recommend for anyone looking to go solar in Bangladesh.",
      verified: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: formData.name,
      rating: formData.rating,
      date: "Just now",
      comment: formData.comment,
      verified: false,
    };
    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setShowForm(false);
    setFormData({ name: "", email: "", rating: 5, comment: "" });
    setTimeout(() => setSubmitted(false), 3000);
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
                    fill={star <= Math.round(avgRating) ? "#16A34A" : "none"}
                    className={
                      star <= Math.round(avgRating)
                        ? "text-accent"
                        : "text-ink/20"
                    }
                  />
                ))}
              </div>
              <div className="text-ink-mid">{reviews.length} reviews</div>
            </div>

            <div className="space-y-2">
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-ink-mid w-3">{star}</span>
                  <Star size={14} className="text-accent" fill="#16A34A" />
                  <div className="flex-1 h-2 bg-ink/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{
                        width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-ink-mid w-6">{count}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full mt-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors"
            >
              Write a Review
            </button>
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
                  Thank you! Your review has been submitted.
                </span>
              </m.div>
            )}

            {showForm && (
              <ReviewForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            )}

            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
