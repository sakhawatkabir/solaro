"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@/app/actions/users";
import UserFormHeader from "./components/UserFormHeader";
import FormSkeleton from "../../components/FormSkeleton";
import UserBasicInfo from "./components/UserBasicInfo";
import UserPermissions from "./components/UserPermissions";
import UserDangerZone from "./components/UserDangerZone";

const defaultFormData = {
  name: "",
  email: "",
  role: "VIEWER",
  status: "ACTIVE",
  permissions: ["analytics"],
};

export default function UserFormPage({ params }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const isEdit = params && params.id && params.id !== "new";
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(defaultFormData);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["admin-user", params.id],
    queryFn: () => getUser(params.id),
    enabled: isEdit,
    retry: false,
  });

  const isSuperAdmin = userData?.role === "SUPER_ADMIN";

  useEffect(() => {
    if (!userData) return;

    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "VIEWER",
      status: userData.status || "ACTIVE",
      permissions: userData.permissions || ["analytics"],
    });
  }, [userData]);

  useEffect(() => {
    if (isLoading) return;
    if (isEdit && !userData) {
      push("/admin/users");
    }
  }, [isEdit, userData, isLoading, push]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePermission = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const buildPayload = () => {
    return {
      role: formData.role,
      status: formData.status,
      permissions: formData.permissions,
    };
  };

  const createMutation = useMutation({
    mutationFn: () => createUser(buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      push("/admin/users");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateUser(params.id, buildPayload()),
    onMutate: () => {
      setError("");
      setSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user", params.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      push("/admin/users");
    },
    onError: (err) => {
      setError(err.message);
      setSaving(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      push("/admin/users");
    },
  });

  if (isLoading) {
    return <FormSkeleton fields={4} />;
  }

  return (
    <div className="space-y-6">
      <UserFormHeader
        isEdit={isEdit}
        userName={userData?.name || ""}
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
          <UserBasicInfo
            formData={{ ...formData, id: userData?.id }}
            updateField={updateField}
            readOnly={isSuperAdmin}
          />
          <UserPermissions
            permissions={formData.permissions}
            onToggle={togglePermission}
            readOnly={isSuperAdmin}
          />
        </div>

        <div className="space-y-6">
          {isEdit && !isSuperAdmin && (
            <UserDangerZone
              onDelete={() => {
                if (confirm("Are you sure you want to delete this user?")) {
                  deleteMutation.mutate();
                }
              }}
            />
          )}

          {isSuperAdmin && (
            <div className="rounded-xl bg-zinc-900 border border-amber-500/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <svg
                    className="size-5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Protected
                  </h3>
                  <p className="text-sm text-zinc-400">
                    SUPER_ADMIN cannot be deleted or modified
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
