import React, { useState } from "react";
import useFriendsSuggestion from "../../CustomHooks/useFriendsSuggestion";
import { FaSearch, FaSpinner, FaUsers } from "react-icons/fa";
import FriendItem from "../../Components/FriendsSuggestionCard/FriendItem/FriendItem";
import LoadingFriendSuggestion from "../../Components/FriendsSuggestionCard/LoadingFriendSuggestion/LoadingFriendSuggestion";
import { useForm } from "react-hook-form";

export default function SuggestedFriends() {
  const { register, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const searchValue = watch("search");
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFriendsSuggestion(10, searchValue);
  const suggestions =
    data?.pages.flatMap((page) => page.data.suggestions) || [];

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
            {suggestions?.length}
          </span>
        </div>

        {/* Search Bar */}
        <label className="relative mb-4 block">
          <FaSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            {...register("search")}
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
          {!isLoading && suggestions.length === 0 && (
            <div className="col-span-2 flex items-center justify-center py-10 text-sm font-bold text-gray-500">
              No users matched your search.
            </div>
          )}
          {suggestions?.map((user) => (
            <FriendItem key={user._id} user={user} />
          ))}
        </div>

        {/* Load More Button */}
        <button
          disabled={isLoading || !hasNextPage || isFetchingNextPage}
          onClick={fetchNextPage}
          className=" cursor-pointer  mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isFetchingNextPage ? (
            <>
              <FaSpinner className="animate-spin" /> Loading More...{" "}
            </>
          ) : (
            "Load more users"
          )}
        </button>
      </section>
    </>
  );
}
