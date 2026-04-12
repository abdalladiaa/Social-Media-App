import axios from "axios";
import React, { useState } from "react";
import { 
  Camera, 
  Expand, 
  Users, 
  Mail, 
  Bookmark, 
  FileText
} from "lucide-react";
import { headersObjData } from "../../Helper/HeadersObj";
import { useForm } from "react-hook-form";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import ImagePreview from "../PostCard/ImagePreview";

export default function MyProfileDetailsCard({ userData, posts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      photo: null,
    },
  });

  const imageValue = watch("photo");

  async function updateProfilePhoto(values) {
    const formData = new FormData();
    if (values.photo && values.photo[0]) {
      formData.append("photo", values.photo[0]);
    }
    try {
      const { data } = await axios.put(
        "https://route-posts.routemisr.com/users/upload-photo",
        formData,
        headersObjData(),
      );
      setIsModalOpen(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsModalOpen(true);
      setValue("photo", e.target.files);
    }
  };

  const {
    mutate: updateProfilePhotoMutate,
    isPending: updateProfilePhotoIsPending,
  } = useGenericMutation(updateProfilePhoto, ["allPosts", "userPosts"]);

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
      {/* --- Cover Photo with Gradient --- */}
      <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60">
        {/* Dynamic Abstract Decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_36%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(186,230,253,.22)_0%,rgba(186,230,253,0)_44%)]"></div>
        <div className="absolute -left-16 top-10 h-36 w-36 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute right-8 top-6 h-48 w-48 rounded-full bg-[#c7e6ff]/10 blur-3xl"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent"></div>

        {/* Change Cover Button (UI Only) */}
        <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-4 sm:top-4 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100">
          <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/45 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:text-xs">
            <Camera size={14} />
            Edit Cover
            <input accept="image/*" className="hidden" type="file" />
          </label>
        </div>
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
                      alt={userData?.name}
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg ring-2 ring-[#dbeafe]"
                      src={
                        userData?.photo ||
                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                      }
                    />
                    {/* Expand/Preview Button */}
                    <button
                      type="button"
                      onClick={() => setShowProfilePhoto(true)}
                      className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100"
                      title="View profile photo"
                    >
                      <Expand size={16} />
                    </button>
                    {/* Upload Photo Button */}
                    <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100">
                      <Camera size={17} />
                      <input
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        type="file"
                      />
                    </label>
                  </div>
                </div>

                {/* Identity Info */}
                <div className="min-w-0 pb-1 text-center sm:text-left">
                  <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl capitalize">
                    {userData?.name}
                  </h2>
                  <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                    @{userData?.username}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                    <Users size={13} />
                    Route Posts member
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Header Grid */}
            <div className="grid w-full grid-cols-3 gap-2 lg:w-[480px]">
              {[
                { label: "Followers", value: userData?.followersCount || 0 },
                { label: "Following", value: userData?.followingCount || 0 },
                { label: "Bookmarks", value: userData?.bookmarksCount || 0 },
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
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
            {/* About Section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                About
              </h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Mail size={15} className="text-slate-500" />
                  </div>
                  {userData?.email}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Users size={15} className="text-slate-500" />
                  </div>
                  Active on Route Posts
                </div>
              </div>
            </div>

            {/* Content Stats Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="group relative overflow-hidden rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-5 py-4 transition hover:bg-[#ebf4ff]">
                <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                  My posts
                </p>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  {posts?.length || 0}
                </p>
                <FileText className="absolute right-3 bottom-2 opacity-10 text-blue-900" size={40} />
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-[#dbeafe] bg-[#fdf2ff] px-5 py-4 transition hover:bg-[#faeaff]">
                <p className="text-xs font-bold uppercase tracking-wide text-[#961f8a]">
                  Saved posts
                </p>
                <p className="mt-1 text-3xl font-black text-slate-900">
                  {userData?.bookmarksCount || 0}
                </p>
                <Bookmark className="absolute right-3 bottom-2 opacity-10 text-purple-900" size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals/Forms --- */}
      {isModalOpen && (
        <form
          onSubmit={handleSubmit(updateProfilePhotoMutate)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[28px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-6 text-center border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                Update Profile Picture
              </h3>
            </div>
            <div className="p-8 flex flex-col items-center">
              <img
                src={imageValue?.[0] && URL.createObjectURL(imageValue[0])}
                alt="Preview"
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-50 shadow-xl mb-6"
              />
            </div>
            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={updateProfilePhotoIsPending}
                className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-all"
              >
                {updateProfilePhotoIsPending ? "Saving..." : "Save Photo"}
              </button>
            </div>
          </div>
        </form>
      )}
      {showProfilePhoto && (
        <ImagePreview
          image={userData?.photo}
          onClose={() => setShowProfilePhoto(false)}
        />
      )}
    </section>
  );
}
