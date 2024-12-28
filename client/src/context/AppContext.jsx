import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext({
  backendUrl: "",
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
  getAuthState: () => {},
});

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userData, setUserData] = useState(null);

  const getAuthState = async () => {
    try {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
