import { getProduct } from "@/app/actions/products";
import ProductEditForm from "./ProductEditForm";

export default async function ProductPage({ params }) {
  const isEdit = params.id !== "new";
  let initialData = null;

  if (isEdit) {
    initialData = await getProduct(params.id);
  }

  return (
    <ProductEditForm
      initialData={initialData}
      isEdit={isEdit}
      productId={isEdit ? params.id : null}
    />
  );
}
