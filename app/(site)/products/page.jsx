import { getActiveProducts } from "@/app/actions/products";
import ProductsPageContent from "./ProductsPageContent";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const initialProducts = await getActiveProducts();

  return <ProductsPageContent initialData={initialProducts} />;
}
