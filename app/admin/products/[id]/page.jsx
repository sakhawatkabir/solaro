import { getProduct } from "@/app/actions/products";
import { redirect } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

export default async function ProductPage({ params }) {
  const isEdit = params.id !== "new";
  let initialData = null;

  if (isEdit) {
    initialData = await getProduct(params.id);
    if (!initialData) {
      redirect("/admin/products");
    }
  }

  return (
    <ProductEditForm
      key={params.id}
      initialData={initialData}
      isEdit={isEdit}
      productId={isEdit ? params.id : null}
    />
  );
}
