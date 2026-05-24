import { getSession } from "@/app/actions/auth/session";
import { getActiveDistricts } from "@/app/actions/districts";
import CheckoutPageContent from "./CheckoutPageContent";

export default async function CheckoutPage() {
  const [initialSession, initialDistricts] = await Promise.all([
    getSession(),
    getActiveDistricts(100),
  ]);

  return (
    <CheckoutPageContent
      initialSession={initialSession}
      initialDistricts={initialDistricts}
    />
  );
}
