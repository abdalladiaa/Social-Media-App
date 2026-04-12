import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { headersObjData } from "../Helper/HeadersObj";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState();

  async function getLoggedinUserData() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        headersObjData(),
      );
      setUserData(data?.data.user);
    } catch (err) {
      console.log(err, "from AuthContext");
    }
  }

  useEffect(() => {
    if (token) {
      getLoggedinUserData();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
