import React from "react";

export default function AuthAlert({ type = "error", message }) {
  const alertClasses = {
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <div
      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${
        alertClasses[type] || alertClasses.error
      }`}
    >
      {message}
    </div>
  );
}
