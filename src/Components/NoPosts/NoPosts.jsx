import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";

export default function NoPosts() {
  return (
  <div className="bg-white/40 backdrop-blur-md rounded-[24px] border border-white/60 p-4 flex items-center justify-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.02)] animate-in fade-in zoom-in-95 duration-700 gap-4 mt-4">

    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-blue-400 shadow-sm ring-1 ring-blue-50">
      <MdOutlinePostAdd size={22} />
    </div>


    <div className="flex flex-col items-start">
      <h3 className="text-sm font-black text-[#0B1733]/80 tracking-tight">
        No Posts Shared Yet
      </h3>
    </div>
  </div>
);
}