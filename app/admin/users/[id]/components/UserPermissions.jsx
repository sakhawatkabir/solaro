"use client";

const availablePermissions = [
  {
    key: "analytics",
    label: "Analytics",
    description: "View analytics and reports",
  },
  {
    key: "products",
    label: "Products",
    description: "Manage products and inventory",
  },
  { key: "orders", label: "Orders", description: "View and manage orders" },
  { key: "customers", label: "Customers", description: "Manage customer data" },
  { key: "leads", label: "Leads", description: "Manage leads and pipeline" },
  {
    key: "districts",
    label: "Districts",
    description: "Manage district coverage",
  },
  { key: "users", label: "Users", description: "Manage user accounts" },
  { key: "settings", label: "Settings", description: "Access system settings" },
];

export default function UserPermissions({
  permissions,
  onToggle,
  readOnly = false,
}) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Permissions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {availablePermissions.map((perm) => {
          const isActive = permissions.includes(perm.key);
          return (
            <button
              key={perm.key}
              type="button"
              onClick={() => !readOnly && onToggle(perm.key)}
              className={`
                flex items-start gap-3 p-3 rounded-lg border text-left transition-colors
                ${
                  isActive
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-zinc-800/50 border-zinc-700"
                }
                ${readOnly ? "cursor-not-allowed opacity-70" : "hover:border-zinc-600 cursor-pointer"}
              `}
            >
              <div
                className={`
                  size-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5
                  ${isActive ? "bg-emerald-500" : "bg-zinc-700"}
                `}
              >
                {isActive && (
                  <svg
                    className="size-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${isActive ? "text-emerald-400" : "text-zinc-300"}`}
                >
                  {perm.label}
                </p>
                <p className="text-xs text-zinc-500">{perm.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
