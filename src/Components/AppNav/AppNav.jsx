import React, { useContext, useState } from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CiMenuBurger } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { userData, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function signout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  }

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-1  bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className=" text-md md:text-2xl  font-bold text-[#0066FF]">SocialApp</div>
      <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-gray-200 backdrop-blur-md px-1 py-1 sm:px-1.5">
        <NavLink
          className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-[#61708A] hover:text-[#00C2A8]"
          to="/"
          data-discover="true"
          aria-current="page"
        >
          <IoHomeOutline /> <span className="hidden md:inline-block">Home</span> 
        </NavLink>
        <NavLink
          className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-[#61708A] hover:text-[#00C2A8]"
          to="/profile"
          data-discover="true"
        >
          <FaRegUser /> <span className="hidden md:inline-block">Profile</span> 
        </NavLink>
        <NavLink
          className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-[#61708A] hover:text-[#00C2A8]"
          to="/notifications"
          data-discover="true"
        >
          <IoMdNotificationsOutline /> <span className="hidden md:inline-block">Notification</span> 
        </NavLink>
      </div>

      {/* منطقة المستخدم */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 sm:gap-3 px-2 py-1 rounded-full bg-[#F7FAFF] hover:bg-[#E2E8F0] transition-colors focus:outline-none"
        >
          <img
            src={userData?.photo}
            className="w-4 h-4 sm:w-8 sm:h-8 rounded-full object-cover"
          />
          <span className="hidden sm:inline font-semibold text-[#0B1733]">
            {userData?.name}
          </span>
          <CiMenuBurger className="text-[#61708A]" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-[#E2E8F0] z-50">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-2 text-[#0B1733] hover:bg-[#F7FAFF] transition-colors"
            >
              <FaUser className="text-[#61708A]" />
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2 text-[#0B1733] hover:bg-[#F7FAFF] transition-colors"
            >
              <FaCog className="text-[#61708A]" />
              <span>Settings</span>
            </Link>
            <button
              onClick={signout}
              className="flex items-center gap-3 px-4 py-2 text-[#E23030] hover:bg-[#F7FAFF] transition-colors w-full"
            >
              <FaSignOutAlt className="text-[#E23030]" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
