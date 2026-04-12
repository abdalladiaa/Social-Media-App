
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export function useSignout() {
  const { setToken, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
    if (setUserData) setUserData(null); 
    navigate("/auth");
  };

  return {signout};
}
