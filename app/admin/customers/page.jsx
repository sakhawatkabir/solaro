import { getCustomers } from "@/app/actions/customers";
import CustomersPageContent from "./CustomersPageContent";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const initialData = await getCustomers(1, 9999, "", "");

  return <CustomersPageContent initialData={initialData} />;
}
