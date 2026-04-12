import React from "react";
import { FaUsers, FaSearch, FaChevronDown } from "react-icons/fa";
import FriendItem from "./FriendItem/FriendItem";
import useFriendsSuggestion from "../../CustomHooks/useFriendsSuggestion";
import { Link } from "react-router-dom";
import LoadingFriendSuggestion from "./LoadingFriendSuggestion/LoadingFriendSuggestion";
import { useForm } from "react-hook-form";

export default function FriendsSuggestionCard() {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");
  const { data: users, isLoading } = useFriendsSuggestion(3, searchValue);

  const suggestions = users?.pages[0]?.data?.suggestions || [];
  const suggestionsCount = suggestions.length;

  return (
    <>
      {/* {MOBILE VISION} */}
      <div className="xl:hidden">
        <Link
          to="/suggestions"
          className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
            <FaUsers className="text-[#1877f2]" size={17} />
            Suggested Friends
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              {suggestionsCount}
            </span>
            <span className="text-xs font-bold text-[#1877f2]">Show</span>
          </span>
        </Link>
      </div>

      {/* --- تصميم الديسكتوب (الكارت الكامل) --- */}
      <div className="hidden xl:block bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] p-5 w-full max-w-sm">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <FaUsers size={18} />
            </div>
            <h3 className="text-base font-black text-[#0B1733]">
              Suggested Friends
            </h3>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-600 ring-1 ring-blue-100">
            {suggestionsCount}
          </span>
        </div>

        {/* Search Input */}
        <div className="mb-5">
          <div className="relative group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={14}
            />
            <input
              {...register("search")}
              placeholder="Search friends..."
              className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5"
            />
          </div>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            /* حالة التحميل: بنعرض الـ Skeletons */
            <>
              <LoadingFriendSuggestion />
              <LoadingFriendSuggestion />
              <LoadingFriendSuggestion />
            </>
          ) : suggestions?.length > 0 ? (
            suggestions.map((user) => <FriendItem key={user._id} user={user} />)
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm font-medium text-slate-500 font-['Cairo']">
                No users matched your search.
              </p>
            </div>
          )}
        </div>
        <Link
          to={"suggestions"}
          className="mt-5 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-black text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-200 active:scale-[0.98]"
        >
          View more
          <FaChevronDown size={12} className="text-gray-400" />
        </Link>
      </div>
    </>
  );
}
