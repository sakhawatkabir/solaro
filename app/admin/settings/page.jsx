"use client";

import { useState } from "react";
import SettingsHeader from "./components/SettingsHeader";
import SettingsNav from "./components/SettingsNav";
import GeneralSettings from "./components/GeneralSettings";
import StoreSettings from "./components/StoreSettings";
import NotificationSettings from "./components/NotificationSettings";
import PaymentSettings from "./components/PaymentSettings";
import SecuritySettings from "./components/SecuritySettings";

const sections = [
  { id: "general", label: "General" },
  { id: "store", label: "Store" },
  { id: "notifications", label: "Notifications" },
  { id: "payments", label: "Payments" },
  { id: "security", label: "Security" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettings />;
      case "store":
        return <StoreSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "payments":
        return <PaymentSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <div className="flex flex-col lg:flex-row gap-6">
        <SettingsNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <div className="flex-1">{renderSection()}</div>
      </div>
    </div>
  );
}
