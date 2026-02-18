import React, { useContext } from "react";
import AppNav from "../Components/AppNav/AppNav";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Layout() {
  const { token } = useContext(AuthContext);

  return (
    <>
      {token && <AppNav />}
      <Outlet />
    </>
  );
}
