import { getUserOrders } from "@/app/actions/user/orders";
import DashboardPageContent from "./DashboardPageContent";

export default async function DashboardPage() {
  let initialData = null;
  try {
    initialData = await getUserOrders({ limit: 5 });
  } catch {}

  return <DashboardPageContent initialData={initialData} />;
}
