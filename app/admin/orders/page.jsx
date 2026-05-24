import { getOrders } from "@/app/actions/orders";
import OrdersPageContent from "./OrdersPageContent";

export default async function OrdersPage() {
  const initialData = await getOrders({
    page: 1,
    perPage: 10,
    search: "",
    status: "",
  });

  return <OrdersPageContent initialData={initialData} />;
}
