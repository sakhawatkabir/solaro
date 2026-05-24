"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/actions/products";
import ProductFormHeader from "./components/ProductFormHeader";
import FormSkeleton from "../../components/FormSkeleton";
import ProductBasicInfo from "./components/ProductBasicInfo";
import ProductSpecs from "./components/ProductSpecs";
import ProductPricing from "./components/ProductPricing";
import ProductImages from "./components/ProductImages";
import ProductDangerZone from "./components/ProductDangerZone";

const defaultFormData = {
  name: "",
  category: "HOME_KIT",
  price: "",
  stock: "",
  originalPrice: "",
  status: "ACTIVE",
  description: "",
  badge: "",
  images: [],
  specs: [],
};

export default function ProductEditForm({
  initialData = null,
  isEdit,
  productId,
}) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });

  const { data: productData, isLoading } = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: () => getProduct(productId),
    enabled: isEdit,
    initialData: initialData,
    retry: false,
  });

  useEffect(() => {
    if (!productData) return;

    setFormData({
      name: productData.name || "",
      category: productData.category || "HOME_KIT",
      price: productData.price?.toString() || "",
      stock: productData.stock?.toString() || "",
      originalPrice: productData.originalPrice?.toString() || "",
      status: productData.status || "ACTIVE",
      description: productData.description || "",
      badge: productData.badge || "",
      images: productData.images || [],
      specs: productData.specs
        ? Object.entries(productData.specs).map(([key, value]) => ({
            key,
            value,
          }))
        : [],
    });
  }, [productData]);

  useEffect(() => {
    if (isLoading) return;
    if (isEdit && !productData) {
      push("/admin/products");
    }
  }, [isEdit, productData, isLoading, push]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSpec = () => {
    if (newSpec.key && newSpec.value) {
      setFormData((prev) => ({
        ...prev,
        specs: [...prev.specs, { ...newSpec }],
      }));
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpec = (index) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const updateSpec = (index, field, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    updateField("specs", newSpecs);
  };

  const buildPayload = () => {
    if (!formData.name || !formData.price) {
      throw new Error("Name and price are required.");
    }

    const specsObj = formData.specs.length
      ? JSON.stringify(
          formData.specs.reduce((acc, s) => {
            acc[s.key] = s.value;
            return acc;
          }, {}),
        )
      : null;

    return {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      originalPrice: formData.originalPrice || null,
      stock: formData.stock || "0",
      status: formData.status,
      description: formData.description,
      badge: formData.badge,
      image: formData.images[0] || null,
      images: formData.images,
      specs: specsObj,
    };
  };

  const createMutation = useMutation({
    mutationFn: () => createProduct(buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products-summary"] });
      push("/admin/products");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateProduct(productId, buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-product", productId] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products-summary"] });
      push("/admin/products");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products-summary"] });
      push("/admin/products");
    },
  });

  if (isLoading && !initialData) {
    return <FormSkeleton fields={5} />;
  }

  return (
    <div className="space-y-6">
      <ProductFormHeader
        isEdit={isEdit}
        productName={productData?.name || ""}
        onSave={() =>
          isEdit ? updateMutation.mutate() : createMutation.mutate()
        }
        isSaving={
          saving || createMutation.isPending || updateMutation.isPending
        }
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProductBasicInfo formData={formData} updateField={updateField} />
          <ProductSpecs
            specs={formData.specs}
            newSpec={newSpec}
            onNewSpecChange={setNewSpec}
            onAddSpec={addSpec}
            onRemoveSpec={removeSpec}
            onUpdateSpec={updateSpec}
          />
        </div>

        <div className="space-y-6">
          <ProductPricing formData={formData} updateField={updateField} />
          <ProductImages
            value={formData.images}
            onChange={(urls) => updateField("images", urls)}
          />
          {isEdit && (
            <ProductDangerZone
              onDelete={() => {
                if (confirm("Are you sure you want to delete this product?")) {
                  deleteMutation.mutate();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
