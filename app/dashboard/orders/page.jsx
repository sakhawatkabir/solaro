import { getUserOrders } from "@/app/actions/user/orders";
import OrdersPageContent from "./OrdersPageContent";

export default async function OrdersPage() {
  let initialData = null;
  try {
    initialData = await getUserOrders();
  } catch {}

  return <OrdersPageContent initialData={initialData} />;
}
