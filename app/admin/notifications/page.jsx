import { getAdminNotifications } from "@/app/actions/notifications";
import NotificationsPageContent from "./NotificationsPageContent";

export default async function AdminNotificationsPage() {
  const initialData = await getAdminNotifications({
    page: 1,
    perPage: 20,
    type: "",
    read: "",
    search: "",
  });

  return <NotificationsPageContent initialData={initialData} />;
}
