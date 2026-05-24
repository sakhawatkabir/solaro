import { getLeads } from "@/app/actions/leads";
import LeadsPageContent from "./LeadsPageContent";

export default async function LeadsPage() {
  const initialData = await getLeads(1, 10, "", "", "", "");

  return <LeadsPageContent initialData={initialData} />;
}
