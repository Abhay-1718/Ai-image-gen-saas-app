import React, { useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const GoogleButton = () => {
  const { backendUrl } = useContext(AppContext);

  // Response handler after Google Login
  const responseGoogle = async (response) => {
    if (response?.code) {
      try {
        const { data } = await axios.post(backendUrl + "/api/auth/google", {
          code: response.code,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          // Optionally, redirect user to home page
          window.location.href = "/"; // Or navigate programmatically if using react-router
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error during Google authentication.");
      }
    } else {
      toast.error("Google authentication failed.");
    }
  };

  // Google login setup
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",  // Keep as auth-code for the popup flow
  });

  return (
    <button
      onClick={() => googleLogin()}
      className="mt-4 flex items-center justify-center rounded-md border px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
    >
      <img
        className="mr-2 h-5"
        src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
        alt="Google Logo"
      />
      Log in with Google
    </button>
  );
};

export default GoogleButton;
