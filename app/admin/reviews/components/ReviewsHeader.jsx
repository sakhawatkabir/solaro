import { Star } from "lucide-react";

export default function ReviewsHeader({ totalReviews }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">Customer Reviews</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {totalReviews} reviews &middot; Manage and moderate customer feedback
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <Star className="size-5 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-400">Reviews</span>
      </div>
    </div>
  );
}
