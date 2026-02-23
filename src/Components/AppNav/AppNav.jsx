import React, { useContext, useState, useEffect, useRef } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CiMenuBurger } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userData, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  function signout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/auth");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // تنسيق الروابط الموحد مع استجابة ذكية للموبايل
  const navLinkStyling = ({ isActive }) =>
    `relative flex items-center justify-center gap-2 rounded-xl px-3 py-2 md:px-4 md:py-2 text-sm font-bold transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
        : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav className="flex items-center justify-between px-3 md:px-10 py-3 bg-white/95 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-[50]">
      
      {/* Logo - يصغر قليلاً في الموبايل */}
      <div className="flex shrink-0">
        <Link to="/" className="text-lg md:text-2xl font-black tracking-tighter text-blue-600">
          <span>Social App</span>
        </Link>
      </div>

      {/* Central Navigation - متواجد دائماً في الأعلى */}
      <div className="flex items-center gap-0.5 md:gap-1 p-1 bg-gray-50/50 rounded-2xl border border-gray-100 mx-2">
        <NavLink className={navLinkStyling} to="/">
          <IoHomeOutline size={20} />
          <span className="hidden lg:inline">Home</span>
        </NavLink>

        <NavLink className={navLinkStyling} to="/profile">
          <FaRegUser size={18} />
          <span className="hidden lg:inline">Profile</span>
        </NavLink>

        <NavLink className={navLinkStyling} to="/notifications">
          <div className="relative">
            <IoMdNotificationsOutline size={22} />
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
          <span className="hidden lg:inline">Notifications</span>
        </NavLink>
      </div>

      {/* User Area */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 p-1 md:p-1.5 md:pr-3 rounded-full bg-white border border-gray-200 hover:border-blue-300 transition-all"
        >
          <div className="relative">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-gray-100"
              alt="user"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          {/* اسم المستخدم يختفي في الشاشات الصغيرة جداً */}
          <span className="hidden md:inline font-bold text-sm text-gray-700">
            {userData?.name?.split(" ")[0]}
          </span>
          <CiMenuBurger className="text-gray-400" size={16} />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-3 w-52 md:w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[110] animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-3 border-b border-gray-50 mb-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Account</p>
              <p className="text-sm font-bold text-gray-800 truncate">{userData?.email}</p>
            </div>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50">
              <FaUser size={14} className="text-gray-400" /> Profile
            </Link>
            <button onClick={signout} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 w-full text-left">
              <FaSignOutAlt size={14} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}