import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext({
  backendUrl: "",
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
});

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  console.log("Backend URL:", backendUrl); // Debugging

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Initialize with null for user data

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {
        params: { userId: "userId" }  // Make sure userId or email is passed in params.
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

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
