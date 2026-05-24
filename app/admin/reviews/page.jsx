import { getReviews } from "@/app/actions/reviews";
import ReviewsPageContent from "./ReviewsPageContent";

export default async function ReviewsPage() {
  const initialData = await getReviews({
    page: 1,
    perPage: 10,
    search: "",
    status: "",
    rating: "",
  });

  return <ReviewsPageContent initialData={initialData} />;
}
