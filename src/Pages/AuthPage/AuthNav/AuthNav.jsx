import React from "react";
import { Link } from "react-router-dom";

export default function AuthNav({ activeTab }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative flex w-full max-w-[320px] bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 backdrop-blur-sm">
        <div
          className={`absolute h-[calc(100%-12px)] top-[6px] transition-all duration-300 ease-out bg-white rounded-xl shadow-md border border-gray-100 w-[calc(50%-6px)] ${
            activeTab === "login" ? "left-[6px]" : "left-[calc(50%)]"
          }`}
        />

        {/* Login Link */}
        <Link
          to="/auth/login"
          className={`relative z-10 flex-1 py-2.5 text-center text-sm font-bold transition-colors duration-300 ${
            activeTab === "login"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Login
        </Link>

        {/* Register Link */}
        <Link
          to="/auth/register"
          className={`relative z-10 flex-1 py-2.5 text-center text-sm font-bold transition-colors duration-300 ${
            activeTab === "register"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
