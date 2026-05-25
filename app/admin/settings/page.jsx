import { getSettings } from "@/app/actions/settings";
import SettingsPageContent from "./SettingsPageContent";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const initialData = await getSettings();

  return <SettingsPageContent initialData={initialData} />;
}
