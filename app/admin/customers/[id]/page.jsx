"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/app/actions/customers";
import CustomerFormHeader from "./components/CustomerFormHeader";
import CustomerBasicInfo from "./components/CustomerBasicInfo";
import CustomerAddress from "./components/CustomerAddress";
import CustomerNotes from "./components/CustomerNotes";
import CustomerDangerZone from "./components/CustomerDangerZone";

const defaultFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  postalCode: "",
  status: "ACTIVE",
  notes: "",
};

export default function CustomerFormPage({ params }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const isEdit = params && params.id && params.id !== "new";
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);

  const { data: customerData, isLoading } = useQuery({
    queryKey: ["admin-customer", params.id],
    queryFn: () => getCustomer(params.id),
    enabled: isEdit,
    retry: false,
  });

  useEffect(() => {
    if (!customerData) return;

    setFormData({
      name: customerData.name || "",
      email: customerData.email || "",
      phone: customerData.phone || "",
      address: customerData.address || "",
      city: customerData.city || "",
      district: customerData.district || "",
      postalCode: customerData.postalCode || "",
      status: customerData.status || "ACTIVE",
      notes: customerData.notes || "",
    });
  }, [customerData]);

  useEffect(() => {
    if (isLoading) return;
    if (isEdit && !customerData) {
      push("/admin/customers");
    }
  }, [isEdit, customerData, isLoading, push]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    if (!formData.name || !formData.email) {
      throw new Error("Name and email are required.");
    }

    return {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address || null,
      city: formData.city || null,
      district: formData.district || null,
      postalCode: formData.postalCode || null,
      status: formData.status,
      notes: formData.notes || null,
    };
  };

  const createMutation = useMutation({
    mutationFn: () => createCustomer(buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-customers"]);
      push("/admin/customers");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateCustomer(params.id, buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-customer", params.id]);
      queryClient.invalidateQueries(["admin-customers"]);
      push("/admin/customers");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCustomer(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-customers"]);
      push("/admin/customers");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-3 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerFormHeader
        isEdit={isEdit}
        customerName={customerData?.name || ""}
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
          <CustomerBasicInfo formData={formData} updateField={updateField} />
          <CustomerAddress formData={formData} updateField={updateField} />
          <CustomerNotes formData={formData} updateField={updateField} />
        </div>

        <div className="space-y-6">
          {isEdit && (
            <CustomerDangerZone
              onDelete={() => {
                if (confirm("Are you sure you want to delete this customer?")) {
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
