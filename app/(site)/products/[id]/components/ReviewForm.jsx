"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-ink/5"
    >
      <h4 className="text-lg font-semibold text-ink mb-4">Write Your Review</h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-accent focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-accent focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-sm text-ink-mid mb-2 block">Your Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  fill={star <= formData.rating ? "#16A34A" : "none"}
                  className={
                    star <= formData.rating ? "text-accent" : "text-ink/20"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Share your experience with this product..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-ink/10 focus:border-accent focus:outline-none resize-none"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-ink/5 text-ink rounded-full font-semibold hover:bg-ink/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </m.div>
  );
}
