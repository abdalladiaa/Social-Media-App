import React from "react";
import {
  FaUsers,
  FaUserPlus,
  FaBookmark,
  FaRegBookmark,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdPostAdd, MdSave } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendar3 } from "react-icons/bs";

export default function ProfileDetailsCard({ userData, posts }) {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] p-6 sm:p-8 w-full mb-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {/* الصورة والاسم والبريد */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <img
            src={userData?.photo || "https://via.placeholder.com/150"} // وضعت صورة افتراضية تحسباً لعدم وجود صورة
            alt={userData?.name}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-lg"
          />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-[#0B1733]">
          {userData?.name || "User Name"}
        </h2>

        {/* Username Badge */}
        <div className="mt-2 bg-[#0066FF]/10 px-3 py-1 rounded-full">
          <p className="text-sm text-[#0066FF] font-semibold tracking-wide">
            @{userData?.username || "Route"}
          </p>
        </div>

        <p className="text-sm text-[#61708A] mt-3 flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">
          <FaRegEnvelope className="text-[#61708A] text-base" />
          {userData?.email || "user@example.com"}
        </p>
      </div>

      {/* الإحصائيات (شبكة 2x2) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        {/* Followers */}
        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-[#0066FF]">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <span className="block text-xl font-extrabold text-[#0B1733]">
            {userData?.followersCount || 0}
          </span>
          <span className="text-xs font-medium text-[#61708A] mt-1">
            Followers
          </span>
        </div>

        {/* Following */}
        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-teal-100 rounded-lg text-[#00C2A8]">
              <FaUserPlus className="text-xl" />
            </div>
          </div>
          <span className="block text-xl font-extrabold text-[#0B1733]">
            {userData?.followingCount || 0}
          </span>
          <span className="text-xs font-medium text-[#61708A] mt-1">
            Following
          </span>
        </div>

        {/* Bookmarks */}
        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-500">
              <FaBookmark className="text-xl" />
            </div>
          </div>
          <span className="block text-xl font-extrabold text-[#0B1733]">
            {userData?.bookmarksCount || 0}
          </span>
          <span className="text-xs font-medium text-[#61708A] mt-1">
            Bookmarks
          </span>
        </div>

        {/* My Posts */}
        <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-center mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-500">
              <MdPostAdd className="text-xl" />
            </div>
          </div>
          <span className="block text-xl font-extrabold text-[#0B1733]">
            {posts?.length || 0}
          </span>
          <span className="text-xs font-medium text-[#61708A] mt-1">
            My Posts
          </span>
        </div>
      </div>

      {/* زر تعديل الملف الشخصي */}
      <button className="w-full mt-6 py-3.5 bg-[#0066FF] text-white font-bold rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200">
        Edit Profile
      </button>
    </div>
  );
}
