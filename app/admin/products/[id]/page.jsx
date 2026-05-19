"use client";

import { useState } from "react";
import { products as mockProducts } from "../../data/mock";
import ProductFormHeader from "./components/ProductFormHeader";
import ProductBasicInfo from "./components/ProductBasicInfo";
import ProductSpecs from "./components/ProductSpecs";
import ProductPricing from "./components/ProductPricing";
import ProductImages from "./components/ProductImages";
import ProductDangerZone from "./components/ProductDangerZone";

export default function ProductFormPage({ params }) {
  const isEdit = params && params.id && params.id !== "new";
  const existingProduct = isEdit
    ? mockProducts.find((p) => p.id === params.id)
    : null;

  const [formData, setFormData] = useState({
    name: existingProduct?.name || "",
    category: existingProduct?.category || "Home Kits",
    price: existingProduct?.price?.toString() || "",
    stock: existingProduct?.stock?.toString() || "",
    status: existingProduct?.status || "active",
    description: "",
    specs: existingProduct ? [{ key: "Wattage", value: "550W" }] : [],
  });

  const [newSpec, setNewSpec] = useState({ key: "", value: "" });

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

  return (
    <div className="space-y-6">
      <ProductFormHeader isEdit={isEdit} productName={existingProduct?.name} />

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
          <ProductImages />
          {isEdit && <ProductDangerZone />}
        </div>
      </div>
    </div>
  );
}
