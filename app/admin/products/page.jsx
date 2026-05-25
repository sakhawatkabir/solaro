import { getProducts } from "@/app/actions/products";
import ProductsPageContent from "./ProductsPageContent";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const initialData = await getProducts(1, 8, "", "", "");

  return <ProductsPageContent initialData={initialData} />;
}
