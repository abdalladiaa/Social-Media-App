import React, { useState } from "react";
import Login from "./Login/Login";
import AuthNav from "./AuthNav/AuthNav";
import Register from "./Register/Register";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-12 sm:px-6">
      {/* الحاوية الرئيسية */}
      <div
        className={`relative w-full transition-all duration-500 ease-in-out ${activeTab === "login" ? "max-w-md" : "max-w-2xl"} bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white p-2 sm:p-4`}
      >
        <div className="bg-white rounded-[2rem] p-6 sm:p-8">
          {/* التنقل بين التبويبات */}
          <div className="mb-8">
            <AuthNav setActiveTab={setActiveTab} activeTab={activeTab} />
          </div>

          {/* المحتوى مع أنيميشن بسيط عند التبديل */}
          <div className="transition-opacity duration-300 ease-in">
            {activeTab === "login" ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <Login />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <Register />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer بسيط أسفل الصفحة */}
      <div className="absolute bottom-6 text-center text-gray-400 text-xs font-medium">
        © 2026 SocialUP Platform. All rights reserved.
      </div>
    </div>
  );
}
