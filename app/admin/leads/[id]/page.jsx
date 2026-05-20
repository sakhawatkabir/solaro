"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLead, updateLead, deleteLead } from "@/app/actions/leads";
import LeadFormHeader from "./components/LeadFormHeader";
import LeadBasicInfo from "./components/LeadBasicInfo";
import LeadDetails from "./components/LeadDetails";
import LeadNotes from "./components/LeadNotes";
import LeadDangerZone from "./components/LeadDangerZone";

export default function LeadFormPage({ params }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    source: "WEBSITE",
    status: "NEW",
    priority: "MEDIUM",
    assignedTo: "",
    estimatedValue: "",
    notes: "",
  });

  const { data: leadData, isLoading } = useQuery({
    queryKey: ["admin-lead", params.id],
    queryFn: () => getLead(params.id),
    enabled: !!params.id,
    retry: false,
  });

  useEffect(() => {
    if (!leadData) return;

    setFormData({
      name: leadData.name || "",
      email: leadData.email || "",
      phone: leadData.phone || "",
      company: leadData.company || "",
      message: leadData.message || "",
      source: leadData.source || "WEBSITE",
      status: leadData.status || "NEW",
      priority: leadData.priority || "MEDIUM",
      assignedTo: leadData.assignedTo || "",
      estimatedValue: leadData.estimatedValue?.toString() || "",
      notes: leadData.notes || "",
    });
  }, [leadData]);

  useEffect(() => {
    if (isLoading) return;
    if (!leadData) {
      router.push("/admin/leads");
    }
  }, [leadData, isLoading, router]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      throw new Error("Name, email, and phone are required.");
    }

    return {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || null,
      message: formData.message || null,
      source: formData.source,
      status: formData.status,
      priority: formData.priority,
      assignedTo: formData.assignedTo || null,
      estimatedValue: formData.estimatedValue || null,
      notes: formData.notes || null,
    };
  };

  const updateMutation = useMutation({
    mutationFn: () => updateLead(params.id, buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lead", params.id]);
      queryClient.invalidateQueries(["admin-leads"]);
      router.push("/admin/leads");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLead(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-leads"]);
      router.push("/admin/leads");
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
      <LeadFormHeader
        leadName={leadData?.name || ""}
        onSave={() => updateMutation.mutate()}
        isSaving={saving || updateMutation.isPending}
      />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LeadBasicInfo formData={formData} updateField={updateField} />
          <LeadDetails formData={formData} updateField={updateField} />
          <LeadNotes formData={formData} updateField={updateField} />
        </div>

        <div className="space-y-6">
          <LeadDangerZone
            onDelete={() => {
              if (confirm("Are you sure you want to delete this lead?")) {
                deleteMutation.mutate();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
