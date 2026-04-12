import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export function useSignout() {
  const { setToken, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
    if (setUserData) setUserData(null);
    queryClient.clear();
    navigate("/auth/login");
  };

  return { signout };
}

