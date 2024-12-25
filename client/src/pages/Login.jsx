import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true; //it will send the cookies also with this request
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (data) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md border border-gray-950">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-gray-600">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <div className="flex flex-col justify-center pt-8">
          {/* Google Login Button */}
          <button className="mt-4 flex items-center justify-center rounded-md border px-4 py-2 bg-gray-100 hover:bg-gray-200 transition">
            <img
              className="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google Logo"
            />
            Log in with Google
          </button>

          {/* Divider */}
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
              or
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onsubmitHandler}
            className="flex flex-col pt-3 md:pt-8"
          >
            {/* Name input for Sign Up only */}
            {state === "Sign Up" && (
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    id="signup-name"
                    className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="login-email"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-12 flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="login-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <p
                onClick={() => navigate("/reset-password")}
                className="mt-4 text-gray-800 cursor-pointer"
              >
                Forgot password?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              {state === "Sign Up" ? "Create Account" : "Log in"}
            </button>
          </form>

          {/* Toggle between Sign Up and Log In */}
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              {state === "Sign Up" ? (
                <>
                  Already have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => setState("Log In")}
                    className="underline-offset-4 font-semibold text-gray-900 underline"
                  >
                    Log in here
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <Link
                    href="#"
                    onClick={() => setState("Sign Up")}
                    className="underline-offset-4 font-semibold text-gray-900 underline"
                  >
                    Sign up for free
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Background Image Section (hidden on small screens) */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-10 z-10 px-8 text-white opacity-100">
          <p className="mb-8 text-3xl sm:text-4xl font-semibold leading-10">
            Welcome Back to PixiForge – Your Gateway to AI-Powered Image
            Creation and Endless Creative Possibilities
          </p>
          <p>Abhay Singh</p>
        </div>
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src="https://images.unsplash.com/photo-1454817481404-7e84c1b73b4a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
