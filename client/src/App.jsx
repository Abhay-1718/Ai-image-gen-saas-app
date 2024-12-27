import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext"; // Correct way to import AppContextProvider
import { useContext } from "react";
import { AppContext } from "./context/AppContext"; 
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';

const App = () => {
  // const { isLoggedin } = useContext(AppContext);

  return (
    <>
    <AppContextProvider>
      <ToastContainer />
      <Routes>
        {/* If not logged in, redirect to login page */}
        <Route path="/"  element= { <Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      </AppContextProvider>
    </>
  );
};

export default App;
