import Link from "next/link";
import React from "react";
import { logoutUser } from "../../../utils/auth";
import { useRouter } from "next/navigation";
import Home from "../../../public/home.png";
import Setting from "../../../public/setting.png";
import User from "../../../public/user.png";
import Logout from "../../../public/logout.png";
interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const router = useRouter();

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out md:translate-x-0 z-30`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">PostHub</h2>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
            >
              <img src={Home.src} alt="Home" className="w-5 h-5 mr-3" />
              Dashboard
            </Link>

            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <img src={User.src} alt="User" className="w-5 h-5 mr-3" />
              Profile
            </Link>

            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <img src={Setting.src} alt="Setting" className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                logoutUser();
                router.push("/login");
              }}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
            >
              <img src={Logout.src} alt="Logout" className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
