import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Search from "./components/Search";
import { useAuth } from "./context/UserAuthContext";
import React, { useEffect } from "react";

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location= useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login', { replace: true });
    }
  }, [currentUser, navigate, location]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Search />} />
    </Routes>
  );
}

export default App;
