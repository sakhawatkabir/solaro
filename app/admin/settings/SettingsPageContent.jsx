"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  updateSettings,
  resetSettings,
} from "@/app/actions/settings";
import SettingsHeader from "./components/SettingsHeader";
import SettingsTabs from "./components/SettingsTabs";
import GeneralSettings from "./components/GeneralSettings";
import ContactSettings from "./components/ContactSettings";
import BusinessSettings from "./components/BusinessSettings";
import FormSkeleton from "../components/FormSkeleton";

const tabs = [
  { id: "general", label: "General" },
  { id: "contact", label: "Contact" },
  { id: "business", label: "Business" },
];

export default function SettingsPageContent({ initialData }) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => getSettings(),
    initialData: initialData,
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: (data) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setError(err.message || "Failed to save settings");
      setTimeout(() => setError(null), 5000);
    },
  });

  const resetMutation = useMutation({
    mutationFn: () => resetSettings(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      setSuccess(true);
      setError(null);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (err) => {
      setError(err.message || "Failed to reset settings");
      setTimeout(() => setError(null), 5000);
    },
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <FormSkeleton fields={8} />;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader
        onSave={handleSave}
        onReset={() => resetMutation.mutate()}
        isSaving={updateMutation.isPending}
        isSuccess={success}
        error={error}
      />

      <SettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div>
        {activeTab === "general" && (
          <GeneralSettings settings={formData} onChange={handleChange} />
        )}
        {activeTab === "contact" && (
          <ContactSettings settings={formData} onChange={handleChange} />
        )}
        {activeTab === "business" && (
          <BusinessSettings settings={formData} onChange={handleChange} />
        )}
      </div>
    </div>
  );
}
