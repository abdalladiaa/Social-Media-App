import React, { useState } from "react";
import useFriendsSuggestion from "../../CustomHooks/useFriendsSuggestion";
import { FaSearch, FaUsers } from "react-icons/fa";
import FriendItem from "../../Components/FriendsSuggestionCard/FriendItem/FriendItem";
import LoadingFriendSuggestion from "../../Components/FriendsSuggestionCard/LoadingFriendSuggestion/LoadingFriendSuggestion";

export default function SuggestedFriends() {
  const [limit, setLimit] = useState(10);
  const { data: users, isLoading } = useFriendsSuggestion(limit , ["friendSuggest" , limit]);

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaUsers size={18} className="text-[#1877f2]" />
            <h1 className="text-xl font-extrabold text-slate-900">
              All Suggested Friends
            </h1>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {users?.data?.suggestions?.length}
          </span>
        </div>

        {/* Search Bar */}
        <label className="relative mb-4 block">
          <FaSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            placeholder="Search by name or username..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white transition-all"
          />
        </label>

        {/* Grid of Users */}
        <div className="grid gap-3 sm:grid-cols-2">
          {isLoading && (
            <>
              <LoadingFriendSuggestion />
              <LoadingFriendSuggestion />
              <LoadingFriendSuggestion />
              <LoadingFriendSuggestion />
            </>
          )}
          {users?.data.suggestions.map((user) => (
            <FriendItem key={user._id} user={user} />
          ))}
        </div>

        {/* Load More Button */}
        <button
          disabled={isLoading}
          onClick={() => setLimit(limit + 10)}
          className=" cursor-pointer  mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Load more users
        </button>
      </section>
    </>
  );
}
