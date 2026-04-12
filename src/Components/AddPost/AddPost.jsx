import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Earth,
  Image as ImageIcon,
  Smile,
  Send,
  ChevronDown,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function AddPost() {
  const { userData } = useContext(AuthContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      body: "",
      image: null,
      privacy: "public",
    },
  });

  const bodyValue = watch("body");
  const imageValue = watch("image");

  const isFormEmpty =
    !bodyValue?.trim() && (!imageValue || imageValue.length === 0);


  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function addPost(values) {
    const formData = new FormData();
    formData.append("body", values.body || " ");
    formData.append("privacy", values.privacy);
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    const response = await axios.post(
      "https://route-posts.routemisr.com/posts",
      formData,
      headersObjData(),
    );
    return response;
  }

  const { mutate, isPending } = useGenericMutation(
    addPost,
    ["allPosts", "userPosts"],
    "Post added successfully!",
    "Failed to add post",
  );

  const onEmojiClick = (emojiData) => {
    setValue("body", (bodyValue || "") + emojiData.emoji);
  };

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setShowEmoji(false);
      },
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-6 transition-all hover:shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header Section */}
        <div className="mb-3 flex items-start gap-3">
          <Link to={"/profile"} className="shrink-0">
            <img
              alt={userData?.name}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-50 hover:ring-blue-100 transition-all"
              src={userData?.photo}
            />
          </Link>
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900 leading-tight">
              {userData?.name?.toLowerCase()}
            </p>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
              <Earth size={12} />
              <select
                {...register("privacy")}
                className="bg-transparent outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="public">Public</option>
                <option value="following">Followers</option>
                <option value="only_me">Only me</option>
              </select>
              <ChevronDown size={10} className="-ml-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Textarea Section */}
        <textarea
          {...register("body")}
          rows="4"
          placeholder={`What's on your mind, ${userData?.name?.split(" ")[0]}?`}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white resize-none"
        />

        {/* Image Preview */}
        {imageValue && imageValue.length > 0 && (
          <div className="relative mt-3 group animate-in zoom-in-95 duration-300">
            <img
              src={URL.createObjectURL(imageValue[0])}
              alt="Preview"
              className="max-h-[350px] w-full rounded-2xl object-cover border border-slate-200"
            />
            <button
              type="button"
              onClick={() => setValue("image", null)}
              className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all shadow-lg"
            >
              <IoCloseCircle size={22} />
            </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
              <ImageIcon size={18} className="text-emerald-600" />
              <span className="hidden sm:inline">Photo/video</span>
              <input
                {...register("image")}
                accept="image/*"
                className="hidden"
                type="file"
              />
            </label>


            <div className="relative" ref={emojiRef}>
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                type="button"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 ${showEmoji ? "text-blue-600 bg-blue-50" : "text-slate-600"}`}
              >
                <Smile size={18} className="text-amber-500" />
                <span className="hidden sm:inline">Feeling/activity</span>
              </button>

              {showEmoji && (
                <div className="absolute top-full left-0 z-[100] mt-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width={320}
                    height={400}
                    searchPlaceholder="Search emojis..."
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || isFormEmpty}
            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-6 py-2 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-[#166fe5] active:scale-95 disabled:opacity-60"
          >
            {isPending ? "Posting..." : "Post"}
            {!isPending && <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
}
