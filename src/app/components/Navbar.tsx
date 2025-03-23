"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "../../../utils/auth";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // Notify listeners
    router.push("/login");
  };

  return (
    <nav className="fixed w-full p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
