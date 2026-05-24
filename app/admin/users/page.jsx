import { getUsers } from "@/app/actions/users";
import UsersPageContent from "./UsersPageContent";

export default async function UsersPage() {
  const initialData = await getUsers(1, 10, "", "", "");

  return <UsersPageContent initialData={initialData} />;
}
