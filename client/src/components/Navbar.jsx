import { useContext } from "react";
import { AppContext } from "../context/AppContext";  // Import the AppContext
import { assets } from "../assets/asset";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedin, setIsLoggedin } = useContext(AppContext); // Access context here

  console.log("Is logged in:", isLoggedin);  // Debugging isLoggedin state

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-slate-300 transition-all"
      >
        Login
      </button>
    </div>
  );
};

export default Navbar;
