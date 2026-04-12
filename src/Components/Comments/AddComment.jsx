import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { headersObjData } from "../../Helper/HeadersObj";
import axios from "axios";
import { IoCloseCircle, IoImageOutline, IoSend } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function AddComment({ postId }) {
  const { userData } = useContext(AuthContext);
  const { photo, name } = userData || {};

  const emojiPickerRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { content: "", image: null },
  });

  const content = watch("content");
  const image = watch("image");
  const file = image?.[0];

  // preview
  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);


  const isFormEmpty = !content?.trim() && !file;


  const addComment = async ({ content, image }) => {
    const formData = new FormData();
    if (content?.trim()) formData.append("content", content.trim());
    if (image?.[0]) formData.append("image", image[0]);

    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      headersObjData(),
    );

    reset();
    setShowEmoji(false);
    return data;
  };

  const { mutate, isPending } = useGenericMutation(
    addComment,
    ["comments", postId],
    "Comment shared!",
    "Failed to send comment",
  );

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(mutate)}
        className="flex w-full items-end gap-2 bg-white p-3 sm:gap-3"
      >
        <img
          src={photo}
          alt={name}
          className="h-8 w-8 shrink-0 rounded-lg object-cover ring-1 ring-gray-100 sm:h-9 sm:w-9 sm:rounded-xl"
        />

        <div className="flex-1 min-w-0 rounded-[1.25rem] border border-gray-100 bg-gray-50 transition-all focus-within:border-blue-200">
          {preview && (
            <div className="p-2 pb-0">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <img src={preview} alt="Preview" className="h-full w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => setValue("image", null)}
                  className="absolute -right-2 -top-2 rounded-full bg-white text-gray-500 shadow-md hover:text-red-500"
                >
                  <IoCloseCircle size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center px-2 sm:px-3">
            <textarea
              {...register("content")}
              rows={1}
              placeholder="Write..."
              className="flex-1 min-w-0 min-h-[40px] max-h-32 resize-none bg-transparent py-2.5 text-[13px] sm:text-sm outline-none"
            />

            <div className="flex shrink-0 items-center">
              <label htmlFor={`comment-image-${postId}`} className="cursor-pointer p-1.5 text-gray-400 hover:text-blue-500 sm:p-2">
                <IoImageOutline size={18} />
              </label>
              <input id={`comment-image-${postId}`} type="file" accept="image/*" {...register("image")} className="hidden" />

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowEmoji(() => !showEmoji); }}
                className={`p-1.5 sm:p-2 transition-colors ${showEmoji ? "text-amber-500" : "text-gray-400 hover:text-amber-500"}`}
              >
                <Smile size={18} />
              </button>
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isFormEmpty}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-all enabled:hover:bg-blue-700 enabled:active:scale-90 disabled:bg-gray-200 sm:h-10 sm:w-10 sm:rounded-xl"
        >
          {isPending
            ? <Oval height={16} width={16} color="white" secondaryColor="transparent" strokeWidth={4} />
            : <IoSend size={16} />}
        </button>
      </form>

      {showEmoji && (
        <div ref={emojiPickerRef} className="absolute bottom-full right-0 z-[1000] mb-2 w-[280px] sm:w-[320px] rounded-2xl border shadow-2xl">
          <EmojiPicker
            onEmojiClick={(emojiData) => setValue("content", (content || "") + emojiData.emoji)}
            width="100%"
            height={350}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}