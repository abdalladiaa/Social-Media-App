import React from "react";

export default function AuthNav({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex rounded-lg bg-[#F7FAFF] p-1 w-3/4">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === "login"
              ? "bg-white text-[#0B1733] shadow-sm"
              : "text-[#61708A] hover:text-[#00C2A8]"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === "register"
              ? "bg-white text-[#0B1733] shadow-sm"
              : "text-[#61708A] hover:text-[#00C2A8]"
          }`}
        >
          Registration
        </button>
      </div>
    </div>
  );
}
