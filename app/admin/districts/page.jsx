import { getDistricts } from "@/app/actions/districts";
import DistrictsPageContent from "./DistrictsPageContent";

export default async function DistrictsPage() {
  const initialData = await getDistricts(1, 15, "", "", "");

  return <DistrictsPageContent initialData={initialData} />;
}
