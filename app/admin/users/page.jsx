import { getUsers } from "@/app/actions/users";
import UsersPageContent from "./UsersPageContent";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const initialData = await getUsers(1, 10, "", "", "");

  return <UsersPageContent initialData={initialData} />;
}
