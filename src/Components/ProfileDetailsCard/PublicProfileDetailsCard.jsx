import React from "react";
import {
  FaUserPlus,
  FaRegEnvelope,
  FaUserCheck,
  FaUserMinus,
} from "react-icons/fa";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { addFollow } from "../../utils/FollowFunc/FollowFunc";
import { Oval } from "react-loader-spinner";

export default function PublicProfileDetailsCard({ userData }) {
  const isFollowing = userData?.isFollowing;
  const { cover, email, name, photo, username, _id } = userData?.user || {};

  const { mutate, isPending } = useGenericMutation(
    addFollow,
    ["PublicProfilePosts", _id],
    "Action Successful",
    "Action Failed",
  );

  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden w-full mb-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {/* --- Cover Photo --- */}
      <div className="relative h-40 md:h-52 bg-slate-100">
        <img
          src={
            cover ||
            "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop"
          }
          className="w-full h-full object-cover"
          alt="cover"
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center -mt-20 md:-mt-24">
          {/* Avatar Area */}
          <div className="relative shrink-0">
            <img
              src={
                photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
              alt="profile"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#0B1733]">
            {name || "User Name"}
          </h2>

          <div className="mt-2 bg-[#0066FF]/10 px-3 py-1 rounded-full">
            <p className="text-sm text-[#0066FF] font-semibold tracking-wide">
              @{username || "User"}
            </p>
          </div>

          <p className="text-sm text-[#61708A] mt-3 flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">
            <FaRegEnvelope className="text-[#61708A] text-base" />
            {email}
          </p>

          <button
            disabled={isPending}
            onClick={() => mutate(_id)}
            className={`mt-6 w-full sm:w-auto min-w-[160px] cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-black transition-all active:scale-[0.98] group
              ${
                isPending
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isFollowing
                    ? "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-transparent"
                    : "bg-[#1877f2] text-white shadow-lg shadow-blue-200 hover:bg-[#166fe5]"
              }`}
          >
            {isPending ? (
              <Oval
                height="16"
                width="16"
                color="currentColor"
                strokeWidth={5}
                secondaryColor="transparent"
              />
            ) : isFollowing ? (
              <>
                <FaUserCheck size={16} className="group-hover:hidden" />
                <FaUserMinus size={16} className="hidden group-hover:block" />
                <span className="group-hover:hidden">Following</span>
                <span className="hidden group-hover:block">Unfollow</span>
              </>
            ) : (
              <>
                <FaUserPlus size={16} />
                <span>Follow User</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
