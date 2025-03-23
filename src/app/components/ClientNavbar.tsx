"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();

  // Show Navbar only if not on /dashboard
  if (pathname === "/dashboard") return null;

  return <Navbar />;
}
