"use client";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { isAuthenticated,logout } = useAuth();
  return (
    <div>
      <div className="py-5 px-5 lg:px-20 flex justify-between">
        {showRegister && (
          <Register
            setShowRegister={setShowRegister}
            onClose={() => setShowRegister(false)}
          />
        )}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            onClose={() => setShowLogin(false)}
          />
        )}
        <h1 className="text-2xl font-bold text-green-400">Task Manager</h1>
        {isAuthenticated ? (
          <button
          className=" flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-green-50 bg-white text-green-500 text-sm hover:cursor-pointer"
          onClick={logout}
        >
          Sign Out
        </button>
        ) : (
          <div className="flex gap-3">
            <button
              className="flex items-center lg:py-3 lg:px-8 px-1 py-2  rounded-xl gap-2  font-medium hover:cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              <h1>Sign In</h1>
            </button>
            <button
              className="flex items-center lg:py-3 lg:px-6 px-1 py-2 rounded-xl shadow-2xl gap-2 hover:bg-green-50 bg-white text-green-500 text-sm hover:cursor-pointer"
              onClick={() => setShowRegister(true)}
            >
              <h1>Sign Up</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
