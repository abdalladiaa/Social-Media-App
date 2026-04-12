import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useGenericMutation } from "../../../CustomHooks/useGenericMutation";
import { headersObjData } from "../../../Helper/HeadersObj";
import axios from "axios";
import { IoCloseCircle, IoImageOutline } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import { Smile, SendHorizontal } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { AuthContext } from "../../../Context/AuthContext";

export default function AddReply({ postId, commentId }) {
  const { userData } = useContext(AuthContext);
  const { photo, name } = userData || {};

  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null); // ريف للـ textarea عشان الـ focus
  const [preview, setPreview] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { content: "", image: null },
  });

  const content = watch("content");
  const image = watch("image");

  useEffect(() => {
    const file = image?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiData) => {
    const currentVal = watch("content") || "";
    setValue("content", currentVal + emojiData.emoji, { shouldDirty: true });
    // نرجع الفوكس للـ textarea بعد اختيار الإيموجي
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const addReply = async (values) => {
    const formData = new FormData();
    formData.append("content", values.content?.trim() || " ");
    if (values.image?.[0]) formData.append("image", values.image[0]);

    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,
      formData,
      headersObjData(),
    );
    return data;
  };

  const { mutate, isPending } = useGenericMutation(
    addReply,
    ["commentReplies", commentId, postId],
    "Reply shared!",
    "Failed to send reply",
  );

  const handleFormSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setPreview(null);
        setShowEmoji(false);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      },
    });
  };

  const isFormEmpty = !content?.trim() && !image?.[0];

  return (
    <div className="relative w-full" ref={emojiPickerRef}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex items-start gap-2 py-1"
      >
        {/* صورة بروفايل أصغر للردود */}
        <img
          src={photo}
          alt={name}
          className="h-7 w-7 mt-0.5 shrink-0 rounded-full object-cover ring-1 ring-gray-100"
        />

        {/* حاوية الإدخال الرمادية */}
        <div className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 transition-all focus-within:border-[#c7dafc] focus-within:bg-white focus-within:shadow-sm">
          {/* معاينة الصورة قبل الإرسال */}
          {preview && (
            <div className="mb-2 relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="h-16 w-16 rounded-lg object-cover border border-white shadow-sm"
              />
              <button
                type="button"
                onClick={() => setValue("image", null)}
                className="absolute -right-2 -top-2 rounded-full bg-white text-gray-500 shadow-md hover:text-red-500"
              >
                <IoCloseCircle size={18} />
              </button>
            </div>
          )}

          <textarea
            {...register("content")}
            ref={(el) => {
              register("content").ref(el);
              textareaRef.current = el;
            }}
            rows={1}
            placeholder="Write a reply..."
            className="w-full resize-none bg-transparent px-1 py-1 text-[13px] leading-5 outline-none placeholder:text-slate-500 max-h-32"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-1">
            <div className="flex items-center gap-0.5">
              {/* أيقونة الصورة */}
              <label
                htmlFor={`reply-image-${commentId}`}
                className="cursor-pointer p-1.5 text-slate-500 transition-colors hover:bg-slate-200 rounded-full hover:text-emerald-600"
              >
                <IoImageOutline size={16} />
              </label>
              <input
                id={`reply-image-${commentId}`}
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />

              {/* أيقونة الإيموجي */}
              <button
                type="button"
                onClick={() => setShowEmoji((prev) => !prev)}
                className={`p-1.5 rounded-full transition-colors ${
                  showEmoji
                    ? "text-amber-500 bg-amber-50"
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                <Smile size={16} />
              </button>
            </div>

            {/* زر الإرسال */}
            <button
              disabled={isPending || isFormEmpty}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877f2] text-white transition-all enabled:hover:bg-[#166fe5] enabled:active:scale-90 disabled:bg-[#9ec5ff]"
            >
              {isPending ? (
                <Oval
                  height={12}
                  width={12}
                  color="white"
                  secondaryColor="transparent"
                  strokeWidth={5}
                />
              ) : (
                <SendHorizontal size={14} />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* الـ Emoji Picker بمقاس أصغر عشان الردود */}
      {showEmoji && (
        <div className="absolute bottom-full left-0 z-50 mb-2 shadow-2xl border rounded-2xl overflow-hidden">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={280}
            height={350}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}
