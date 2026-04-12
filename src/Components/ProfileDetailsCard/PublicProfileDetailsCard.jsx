import React, { useContext, useState } from "react";
import {
  UserPlus,
  UserCheck,
  UserMinus,
  Mail,
  Users,
  Camera,
  Expand,
} from "lucide-react";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { addFollow } from "../../utils/FollowFunc/FollowFunc";
import { Oval } from "react-loader-spinner";
import { AuthContext } from "../../Context/AuthContext";
import ImagePreview from "../PostCard/ImagePreview";

export default function PublicProfileDetailsCard({ userData }) {
  const isFollowing = userData?.isFollowing;
  const {
    cover,
    email,
    name,
    photo,
    username,
    _id: userId,
    followersCount,
    followingCount,
  } = userData?.user || {};

  const { userData: myData } = useContext(AuthContext);
  console.log(userData);

  const myId = myData?._id;
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);

  const { mutate, isPending } = useGenericMutation(
    addFollow,
    ["PublicProfilePosts", userId],
    "Action Successful",
    "Action Failed",
  );

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
      {/* --- Cover Photo with Gradient --- */}
      <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]"></div>
        <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent"></div>

        {cover && (
          <img
            src={cover}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        )}
      </div>

      {/* --- Main Profile Card --- */}
      <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-5 backdrop-blur-xl shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                {/* Avatar Section */}
                <div className="group/avatar relative shrink-0">
                  <div className="relative">
                    <img
                      alt={name}
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg ring-2 ring-[#dbeafe]"
                      src={
                        photo ||
                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowProfilePhoto(true)}
                      className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100"
                    >
                      <Expand size={16} />
                    </button>
                  </div>
                </div>

                {/* Identity Info */}
                <div className="min-w-0 pb-1 text-center sm:text-left">
                  <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl capitalize">
                    {name}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                    @{username}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                    <Users size={13} />
                    Route Posts member
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Header Grid */}
            <div className="grid w-full grid-cols-2 gap-2 lg:w-[320px]">
              {[
                { label: "Followers", value: followersCount || 0 },
                { label: "Following", value: followingCount || 0 },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-100 bg-white/50 px-3 py-3 text-center transition hover:bg-white sm:px-4 sm:py-4"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Content Grid */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
            {/* About Section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 w-full">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                About
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Mail size={15} className="text-slate-500" />
                  </div>
                  {email}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Users size={15} className="text-slate-500" />
                  </div>
                  Active on Route Posts
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center">
              {myId !== userId && (
                <button
                  disabled={isPending}
                  onClick={() => mutate(userId)}
                  className={`w-full sm:w-auto min-w-[180px] h-fit cursor-pointer inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-black transition-all active:scale-[0.98] group
                    ${
                      isPending
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isFollowing
                          ? "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-transparent"
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
                      <UserCheck size={18} className="group-hover:hidden" />
                      <UserMinus
                        size={18}
                        className="hidden group-hover:block"
                      />
                      <span className="group-hover:hidden">Following</span>
                      <span className="hidden group-hover:block">Unfollow</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      <span>Follow User</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showProfilePhoto && (
        <ImagePreview
          image={photo}
          onClose={() => setShowProfilePhoto(false)}
        />
      )}
    </section>
  );
}
