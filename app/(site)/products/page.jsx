import { getActiveProducts } from "@/app/actions/products";
import ProductsPageContent from "./ProductsPageContent";

export default async function ProductsPage() {
  const initialProducts = await getActiveProducts();

  return <ProductsPageContent initialData={initialProducts} />;
}
