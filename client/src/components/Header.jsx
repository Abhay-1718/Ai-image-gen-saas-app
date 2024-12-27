import { useContext } from "react";
import { assets } from "../assets/asset";  // Ensure this import is correct
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div>
      {/* <img src={assets.he} alt="" /> */}
      <h1>Hey, {userData ? userData.name : "Developer"}</h1>
    </div>
  );
};

export default Header;
