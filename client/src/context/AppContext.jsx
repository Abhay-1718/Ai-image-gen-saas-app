import { createContext, useState } from "react";

export const AppContext = createContext({
  backendUrl: '',
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: null,
  setUserData: () => {}
});

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Initialize with null for user data

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData // Changed state setter name to match the variable
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
