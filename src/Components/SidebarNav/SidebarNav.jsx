import React from "react";
import { FaNewspaper, FaRegBookmark } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function SidebarNav({ setActiveFilter, activeFilter }) {
  const menuItems = [
    { id: "following", label: "Feed", icon: <FaNewspaper size={17} /> },
    {
      id: "me",
      label: "My Posts",
      icon: <HiOutlineSparkles size={18} />,
    },
    { id: "all", label: "Community", icon: <FiGlobe size={18} /> },
    { id: "saved", label: "Saved", icon: <FaRegBookmark size={17} /> },
  ];

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
        <div className="grid grid-cols-2 gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveFilter(item.id)}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-all duration-200 
                ${
                  activeFilter === item.id
                    ? "bg-[#e7f3ff] text-[#1877f2]"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-[0.98]"
                }`}
            >
              <span
                className={
                  activeFilter === item.id ? "text-[#1877f2]" : "text-slate-500"
                }
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden xl:block rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveFilter(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all duration-200 mt-1 first:mt-0 cursor-pointer
              ${
                activeFilter === item.id
                  ? "bg-[#e7f3ff] text-[#1877f2]"
                  : "text-slate-700 hover:bg-slate-100 active:scale-[0.98]"
              }`}
          >
            <span
              className={`shrink-0 ${activeFilter === item.id ? "text-[#1877f2]" : "text-slate-400"}`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
