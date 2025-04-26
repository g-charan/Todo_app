"use client";
import AccountSettings from "@/components/settings/AccountSettings";
import AppPreferences from "@/components/settings/AppPreferences";
import DangerZone from "@/components/settings/DangerZone";
import NotificationSettings from "@/components/settings/NotificationSettings";
import ProfileSection from "@/components/settings/ProfileSection";
import { useState } from "react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-12">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-zinc-400">Customize your GID experience</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-1">
              {[
                { id: "profile", label: "Profile", icon: "👤" },
                { id: "account", label: "Account", icon: "🔐" },
                { id: "preferences", label: "Preferences", icon: "⚙️" },
                { id: "notifications", label: "Notifications", icon: "🔔" },
                { id: "danger", label: "Danger Zone", icon: "⚠️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition ${
                    activeTab === tab.id
                      ? "bg-zinc-800 text-zinc-100"
                      : "text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              {activeTab === "profile" && <ProfileSection />}
              {activeTab === "account" && <AccountSettings />}
              {activeTab === "preferences" && <AppPreferences />}
              {activeTab === "notifications" && <NotificationSettings />}
              {activeTab === "danger" && <DangerZone />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
