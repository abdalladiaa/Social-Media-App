import React from "react";
import {
  FaUsers,
  FaUserPlus,
  FaBookmark,
  FaRegEnvelope,
  FaCamera,
} from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

export default function ProfileDetailsCard({ userData, posts }) {
  
  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden w-full mb-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      
      {/* --- Cover Photo --- */}
      <div className="relative h-40 md:h-52 bg-slate-100">
        <img 
          src={userData?.cover || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"} 
          className="w-full h-full object-cover"
          alt="cover"
        />

        <label className="absolute top-3 right-3 flex h-8 px-3 cursor-pointer items-center gap-2 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/30 hover:bg-black/40 transition-all text-[10px] font-bold uppercase tracking-wider">
          <FaCamera size={12} />
          Change Cover
          <input className="hidden" type="file" />
        </label>
      </div>

      <div className="p-6 sm:p-8">

        <div className="flex flex-col items-center text-center -mt-20 md:-mt-24">
          

          <div className="group/avatar relative shrink-0">
            <button type="button" className="cursor-zoom-in rounded-full">
              <img
                src={userData?.photo || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
                alt={userData?.name}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
              />
            </button>
            <button type="button" className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100" title="View profile photo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-expand"><path d="m15 15 6 6"></path><path d="m15 9 6-6"></path><path d="M21 16v5h-5"></path><path d="M21 8V3h-5"></path><path d="M3 16v5h5"></path><path d="m3 21 6-6"></path><path d="M3 8V3h5"></path><path d="M9 9 3 3"></path></svg>
            </button>
            <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path><circle cx="12" cy="13" r="3"></circle></svg>
              <input className="hidden" type="file" />
            </label>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#0B1733]">
            {userData?.name || "User Name"}
          </h2>

          <div className="mt-2 bg-[#0066FF]/10 px-3 py-1 rounded-full">
            <p className="text-sm text-[#0066FF] font-semibold tracking-wide">
              @{userData?.username || "RouteUser"}
            </p>
          </div>

          <p className="text-sm text-[#61708A] mt-3 flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">
            <FaRegEnvelope className="text-[#61708A] text-base" />
            {userData?.email || "user@example.com"}
          </p>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-[#0066FF]">
                <FaUsers className="text-xl" />
              </div>
            </div>
            <span className="block text-xl font-extrabold text-[#0B1733]">{userData?.followersCount || 0}</span>
            <span className="text-xs font-medium text-[#61708A] mt-1">Followers</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-teal-100 rounded-lg text-[#00C2A8]">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
            <span className="block text-xl font-extrabold text-[#0B1733]">{userData?.followingCount || 0}</span>
            <span className="text-xs font-medium text-[#61708A] mt-1">Following</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-500">
                <FaBookmark className="text-xl" />
              </div>
            </div>
            <span className="block text-xl font-extrabold text-[#0B1733]">{userData?.bookmarksCount || 0}</span>
            <span className="text-xs font-medium text-[#61708A] mt-1">Bookmarks</span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-500">
                <MdPostAdd className="text-xl" />
              </div>
            </div>
            <span className="block text-xl font-extrabold text-[#0B1733]">{posts?.length || 0}</span>
            <span className="text-xs font-medium text-[#61708A] mt-1">My Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
}