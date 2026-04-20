import React, { useContext } from "react";
import AppNav from "../Components/AppNav/AppNav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Layout() {
  const { token } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50">

      {token && <AppNav />}
      

      <main className="mx-auto max-w-6xl px-3 py-3.5 mt-10">
        <Outlet />
      </main>
    </div>
  );
}