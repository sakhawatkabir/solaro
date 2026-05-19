"use client";

import {
  Mail,
  MapPin,
  MessageSquare,
  ExternalLink,
  Calendar,
} from "lucide-react";

const fields = [
  {
    key: "email",
    label: "Email",
    icon: Mail,
    iconWrap: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    key: "district",
    label: "District",
    icon: MapPin,
    iconWrap: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
  {
    key: "interest",
    label: "Interest",
    icon: MessageSquare,
    iconWrap: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    key: "source",
    label: "Source",
    icon: ExternalLink,
    iconWrap: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    capitalize: true,
  },
  {
    key: "date",
    label: "Created",
    icon: Calendar,
    iconWrap: "bg-zinc-500/10",
    iconColor: "text-zinc-400",
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
          ({ key, label, icon: Icon, iconWrap, iconColor, capitalize }) => (
            <div key={key} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${iconWrap} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p
                  className={`text-sm text-white ${capitalize ? "capitalize" : ""}`}
                >
                  {lead[key]}
                </p>
                <p className="text-xs text-zinc-400">{label}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
