import { useEffect, useState } from "react";
import { User, Building, Bell, Shield, Palette } from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [theme, setTheme] = useState("dark"); // default dark
  const [accent, setAccent] = useState("#7F5AF0");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "organization", name: "Organization", icon: Building },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
    { id: "appearance", name: "Appearance", icon: Palette },
  ];

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Accent rang qo‘llash
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-color", accent);
  }, [accent]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 mb-4 md:mb-0">
          <nav className="flex md:flex-col gap-1 md:gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 md:gap-3 px-2 md:px-4 py-1.5 md:py-3 rounded-lg text-xs md:text-base transition-colors whitespace-normal break-words text-center ${
                  activeTab === tab.id
                    ? "bg-[#7F5AF0] text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                style={{ wordSpacing: "-1px" }} // so‘zlar orasini qisqartirish
              >
                <tab.icon className="w-3 h-3 md:w-5 md:h-5 shrink-0" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 md:p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Profile Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Chen"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 md:px-4 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@venture.fund"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 md:px-4 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Role
                    </label>
                    <select className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 md:px-4 text-white focus:outline-none focus:border-[#7F5AF0]">
                      <option>Principal</option>
                      <option>Partner</option>
                      <option>Associate</option>
                      <option>Analyst</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 md:px-4 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>
                </div>

                <button className="w-full md:w-auto bg-[#7F5AF0] text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "organization" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Organization Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Acme Venture Partners"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      AUM
                    </label>
                    <input
                      type="text"
                      defaultValue="$50M"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Investment Focus
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Early-stage B2B SaaS and AI/ML startups"
                      className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#7F5AF0]"
                    />
                  </div>
                </div>
                <button className="w-full md:w-auto bg-[#7F5AF0] text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Update Organization
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "New Deal Alerts",
                      description: "Get notified when new deals are added",
                    },
                    {
                      title: "Task Reminders",
                      description: "Receive reminders for upcoming tasks",
                    },
                    {
                      title: "Portfolio Updates",
                      description: "Stay informed about portfolio milestones",
                    },
                    {
                      title: "Weekly Reports",
                      description: "Get weekly summaries of activity",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-[#1A1A1A] rounded-lg gap-3"
                    >
                      <div>
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-[#7F5AF0] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Security Settings
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "Two-Factor Authentication",
                      desc: "Add an extra layer of security",
                      action: "Enable 2FA",
                      actionClass: "text-[#7F5AF0] hover:text-purple-400",
                    },
                    {
                      title: "Change Password",
                      desc: "Update your account password",
                      action: "Update Password",
                      actionClass: "text-[#7F5AF0] hover:text-purple-400",
                    },
                    {
                      title: "Active Sessions",
                      desc: "Manage your active login sessions",
                      action: "View Sessions",
                      actionClass: "text-red-400 hover:text-red-300",
                    },
                  ].map((sec, i) => (
                    <div key={i} className="p-4 bg-[#1A1A1A] rounded-lg">
                      <h3 className="text-white font-medium mb-1">
                        {sec.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{sec.desc}</p>
                      <button
                        className={`${sec.actionClass} transition-colors`}
                      >
                        {sec.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  Appearance Settings
                </h2>

                <div className="space-y-4">
                  {/* Theme tanlash */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Theme</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: "dark", label: "Dark" },
                        { id: "light", label: "Light" },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`p-3 bg-[#1A1A1A] border-2 rounded-lg cursor-pointer ${
                            theme === t.id
                              ? "border-accent"
                              : "border-transparent"
                          }`}
                        >
                          <div
                            className={`w-full h-20 rounded mb-2 ${
                              t.id === "dark" ? "bg-[#0D0D0D]" : "bg-white"
                            }`}
                          ></div>
                          <p
                            className={`text-xs text-center ${
                              theme === t.id ? "text-accent" : "text-gray-400"
                            }`}
                          >
                            {t.label} {theme === t.id && "(Current)"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color tanlash */}
                  <div>
                    <h3 className="text-white font-medium mb-3">
                      Accent Color
                    </h3>
                    <div className="flex gap-3 flex-wrap">
                      {["#7F5AF0", "#2CB67D", "#FFCD58", "#FF6B6B"].map(
                        (color) => (
                          <button
                            key={color}
                            onClick={() => setAccent(color)}
                            className={`w-10 h-10 rounded-full border-2 ${
                              accent === color
                                ? "border-white"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
