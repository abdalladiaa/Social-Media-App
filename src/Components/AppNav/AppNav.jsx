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

  // تنسيق الروابط - تم تحسينه ليدعم الموبايل والديسكتوب
  const navLinkStyling = ({ isActive }) =>
    `relative flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 rounded-xl px-3 py-2 md:px-4 text-[10px] md:text-sm font-bold transition-all duration-300 ${
      isActive
        ? "text-blue-600 md:bg-blue-600 md:text-white md:shadow-md md:shadow-blue-200"
        : "text-gray-500 hover:text-blue-600 md:hover:bg-gray-100"
    }`;

  return (
    <>
      {/* --- Top Navbar (Logo & User Area) --- */}
      <nav className="flex items-center justify-between px-4 md:px-10 py-3 bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-[50]">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl md:text-2xl font-black tracking-tighter text-blue-600"
          >
            SOCIAL<span className="text-gray-900">UP</span>
          </Link>
        </div>

        {/* Central Navigation - يظهر فقط في الشاشات الكبيرة (md+) */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-gray-50 rounded-2xl border border-gray-100">
          <NavItems navLinkStyling={navLinkStyling} />
        </div>

        {/* User Area */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 p-1 md:p-1.5 md:pr-3 rounded-full bg-white border border-gray-200 hover:border-blue-300 transition-all"
          >
            <div className="relative">
              <img
                src={userData?.photo || "https://via.placeholder.com/150"}
                className="w-8 h-8 rounded-full object-cover border border-gray-100"
                alt="user"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <span className="hidden sm:inline font-bold text-sm text-gray-700">
              {userData?.name?.split(" ")[0]}
            </span>
            <CiMenuBurger className="text-gray-400 ml-1" size={18} />
          </button>

          {/* Dropdown Menu (نفس الكود السابق) */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[110] animate-in fade-in zoom-in duration-200">
              {/* محتوى الـ Dropdown هنا... */}
              <div className="px-4 py-3 border-b border-gray-50 mb-1 text-xs">
                <p className="text-gray-400 font-medium">Signed in as</p>
                <p className="font-bold text-gray-800 truncate">
                  {userData?.email}
                </p>
              </div>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50"
              >
                <FaUser size={14} /> Profile
              </Link>
              <button
                onClick={signout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 w-full text-left"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- Mobile Bottom Navigation --- */}
      {/* يظهر فقط في الشاشات الصغيرة (أقل من md) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-2 flex justify-between items-center z-[50] shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <NavItems navLinkStyling={navLinkStyling} isMobile />
      </div>
    </>
  );
}

// مكون فرعي للروابط لعدم تكرار الكود
function NavItems({ navLinkStyling, isMobile = false }) {
  return (
    <>
      <NavLink className={navLinkStyling} to="/">
        <IoHomeOutline size={isMobile ? 22 : 18} />
        <span className={isMobile ? "mt-0.5" : "hidden lg:inline"}>Home</span>
      </NavLink>

      <NavLink className={navLinkStyling} to="/profile">
        <FaRegUser size={isMobile ? 20 : 16} />
        <span className={isMobile ? "mt-0.5" : "hidden lg:inline"}>
          Profile
        </span>
      </NavLink>

      <NavLink className={navLinkStyling} to="/notifications">
        <IoMdNotificationsOutline size={isMobile ? 24 : 20} />
        <span className={isMobile ? "mt-0.5" : "hidden lg:inline"}>Alerts</span>
      </NavLink>
    </>
  );
}
