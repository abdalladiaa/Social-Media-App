import React, { useState } from "react";
import Login from "./Login/Login";
import AuthNav from "./AuthNav/AuthNav";
import Register from "./Register/Register";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-lg p-6 sm:p-8">
        <AuthNav setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}

