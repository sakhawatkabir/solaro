"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDistrict,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "@/app/actions/districts";
import DistrictFormHeader from "./components/DistrictFormHeader";
import FormSkeleton from "../../components/FormSkeleton";
import DistrictBasicInfo from "./components/DistrictBasicInfo";
import DistrictDangerZone from "./components/DistrictDangerZone";

const defaultFormData = {
  name: "",
  division: "",
  solarPotential: "MEDIUM",
  coverage: false,
  population: "",
  avgSunHours: "",
};

export default function DistrictFormPage({ params }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const isEdit = params && params.id && params.id !== "new";
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);

  const { data: districtData, isLoading } = useQuery({
    queryKey: ["admin-district", params.id],
    queryFn: () => getDistrict(params.id),
    enabled: isEdit,
    retry: false,
  });

  useEffect(() => {
    if (!districtData) return;

    setFormData({
      name: districtData.name || "",
      division: districtData.division || "",
      solarPotential: districtData.solarPotential || "MEDIUM",
      coverage: districtData.coverage || false,
      population: districtData.population?.toString() || "",
      avgSunHours: districtData.avgSunHours?.toString() || "",
    });
  }, [districtData]);

  useEffect(() => {
    if (isLoading) return;
    if (isEdit && !districtData) {
      push("/admin/districts");
    }
  }, [isEdit, districtData, isLoading, push]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => {
    if (!formData.name || !formData.division) {
      throw new Error("Name and division are required.");
    }

    return {
      name: formData.name,
      division: formData.division,
      solarPotential: formData.solarPotential,
      coverage: formData.coverage,
      population: formData.population || null,
      avgSunHours: formData.avgSunHours || null,
    };
  };

  const createMutation = useMutation({
    mutationFn: () => createDistrict(buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-districts"] });
      push("/admin/districts");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateDistrict(params.id, buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-district", params.id],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-districts"] });
      push("/admin/districts");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteDistrict(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-districts"] });
      push("/admin/districts");
    },
  });

  if (isLoading) {
    return <FormSkeleton fields={6} />;
  }

  return (
    <div className="space-y-6">
      <DistrictFormHeader
        isEdit={isEdit}
        districtName={districtData?.name || ""}
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
        <div className="lg:col-span-2">
          <DistrictBasicInfo formData={formData} updateField={updateField} />
        </div>

        <div className="space-y-6">
          {isEdit && (
            <DistrictDangerZone
              onDelete={() => {
                if (confirm("Are you sure you want to delete this district?")) {
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
