import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AuthNav from "./AuthNav/AuthNav";

export default function AuthPage() {
  const { pathname } = useLocation();
  const activeTab = pathname.includes("register") ? "register" : "login";

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-12 sm:px-6">
      <div
        className={`relative w-full transition-all duration-500 ease-in-out ${
          activeTab === "login" ? "max-w-md" : "max-w-2xl"
        } bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-white p-2 sm:p-4`}
      >
        <div className="bg-white rounded-[2rem] p-6 sm:p-8">
          <div className="mb-8">
            <AuthNav activeTab={activeTab} />
          </div>

          <div className="transition-opacity duration-300 ease-in">
            <div
              key={activeTab}
              className={`animate-in fade-in duration-500 ${
                activeTab === "login"
                  ? "slide-in-from-left-4"
                  : "slide-in-from-right-4"
              }`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
