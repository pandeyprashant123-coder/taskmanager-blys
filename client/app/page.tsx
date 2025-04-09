"use client";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
