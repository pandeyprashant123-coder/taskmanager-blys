"use client";
import React, { useState } from "react";
import Register from "./Register";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const HomePage = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex items-center justify-center flex-col h-full py-32 px-10 text-center gap-7">
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
      <h1 className="text-6xl font-bold">Manage Your Task</h1>
      <p className="text-center text-sm">
        Task Manager, listss enable you to organize and prioritize your tasks in
        a fun,
        <br /> flexible, and rewarding way. Let's started
      </p>
      <div className="flex gap-3 pt-4">
        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-orange-500 bg-orange-400 text-white text-sm hover:cursor-pointer"
          >
            Go To Dashboard
          </Link>
        ) : (
          <button
            className="flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-orange-500 bg-orange-400 text-white text-sm hover:cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Get Started
          </button>
        )}
        <a
          target="_blank"
          href="https://www.youtube.com/watch?v=i4nO9rEUU5M"
          className="flex items-center py-3 px-6 rounded-xl shadow-2xl gap-2 hover:bg-green-50 bg-white text-green-500 text-sm hover:cursor-pointer"
        >
          Discover In Video
        </a>
      </div>
    </div>
  );
};

export default HomePage;
