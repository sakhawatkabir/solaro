"use client";

import { Star, User, CheckCircle } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-ink/5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
            <User size={18} className="text-accent" />
          </div>
          <div>
            <div className="font-semibold text-ink flex items-center gap-2">
              {review.customerName || review.name}
              {review.verified && (
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> Verified
                </span>
              )}
            </div>
            <div className="text-sm text-ink-light">{review.date}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              fill={star <= review.rating ? "#FBBF24" : "none"}
              className={
                star <= review.rating ? "text-yellow-400" : "text-ink/20"
              }
            />
          ))}
        </div>
      </div>
      {review.title && (
        <p className="font-medium text-ink mb-1">{review.title}</p>
      )}
      <p className="text-ink-mid leading-relaxed">{review.comment}</p>
    </div>
  );
}
