import React from "react";
import { Navigate } from "react-router-dom";

export default function PostsGuard({ children }) {
  if (localStorage.getItem("token") == null) {
    return <Navigate to="/auth" />;
  } else {
    return children;
  }
}
