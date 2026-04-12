import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGenericMutation } from "../../../CustomHooks/useGenericMutation";
import { addFollow } from "../../../utils/FollowFunc/FollowFunc";
// استيراد الـ Spinner
import { Oval } from "react-loader-spinner";

export default function FriendItem({ user }) {
  const { _id, photo, name, followersCount, mutualFollowersCount, username } =
    user;
    

  const { mutate, isPending } = useGenericMutation(
    addFollow,
    ["friendSuggest"],
    "User Followed",
    "User Doesn't Followed",
  );

  return (
    <div className="rounded-[20px] border border-gray-50 bg-white p-3 transition-all hover:shadow-md hover:border-blue-100 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            <img
              alt={name}
              className="h-11 w-11 rounded-2xl object-cover ring-2 ring-gray-50"
              src={photo}
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="min-w-0">
            <Link
              to={`/profile/${_id}`}
              className="truncate text-sm font-black text-[#0B1733] hover:text-blue-600 cursor-pointer transition-colors"
            >
              {name}
            </Link>
            <p className="truncate text-[11px] font-medium text-gray-500">
              @{username || "user"}
            </p>
          </div>
        </div>

        <button
          disabled={isPending}
          onClick={() => mutate(_id)}
          className={` disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center h-9 w-9 rounded-xl transition-all shadow-sm active:scale-90 
            ${
              isPending
                ? "bg-blue-100"
                : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
        >
          {isPending ? (
            <Oval
              visible={true}
              height="16"
              width="16"
              color="currentColor"
              ariaLabel="oval-loading"
              strokeWidth={5}
              secondaryColor="transparent"
            />
          ) : (
            <FaUserPlus size={14} />
          )}
        </button>
      </div>

      {/* Stats Badges */}
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500 border border-gray-100">
          {followersCount} followers
        </span>
        <span className="rounded-lg bg-blue-50/50 px-2 py-1 text-[10px] font-bold text-blue-600 border border-blue-100/30">
          {mutualFollowersCount} mutual
        </span>
      </div>
    </div>
  );
}
