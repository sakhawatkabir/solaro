import { getOrders } from "@/app/actions/orders";
import OrdersPageContent from "./OrdersPageContent";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const initialData = await getOrders({
    page: 1,
    perPage: 10,
    search: "",
    status: "",
  });

  return <OrdersPageContent initialData={initialData} />;
}
