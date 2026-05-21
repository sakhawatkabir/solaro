"use client";

import {
  Mail,
  Phone,
  Building,
  MessageSquare,
  Calendar,
  DollarSign,
  Tag,
  Hash,
} from "lucide-react";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBDT(amount) {
  return `৳${amount.toLocaleString()}`;
}

const fields = [
  {
    key: "email",
    label: "Email",
    icon: Mail,
    iconWrap: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    key: "phone",
    label: "Phone",
    icon: Phone,
    iconWrap: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    key: "company",
    label: "Company",
    icon: Building,
    iconWrap: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    key: "source",
    label: "Source",
    icon: Tag,
    iconWrap: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    capitalize: true,
  },
  {
    key: "priority",
    label: "Priority",
    icon: Hash,
    iconWrap: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
  {
    key: "estimatedValue",
    label: "Estimated Value",
    icon: DollarSign,
    iconWrap: "bg-green-500/10",
    iconColor: "text-green-400",
    format: (v) => (v ? formatBDT(v) : "—"),
  },
  {
    key: "createdAt",
    label: "Created",
    icon: Calendar,
    iconWrap: "bg-zinc-500/10",
    iconColor: "text-zinc-400",
    format: (v) => formatDate(v),
  },
];

export default function LeadInfoCard({ lead }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Lead Information
      </h3>
      <div className="space-y-4">
        {fields.map(
          ({
            key,
            label,
            icon: Icon,
            iconWrap,
            iconColor,
            capitalize,
            format,
          }) => {
            const value = lead[key];
            if (!value && key !== "estimatedValue") return null;

            return (
              <div key={key} className="flex items-center gap-3">
                <div
                  className={`size-10 rounded-full ${iconWrap} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`size-5 ${iconColor}`} />
                </div>
                <div>
                  <p
                    className={`text-sm text-white ${capitalize ? "capitalize" : ""}`}
                  >
                    {format ? format(value) : value || "—"}
                  </p>
                  <p className="text-xs text-zinc-400">{label}</p>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
