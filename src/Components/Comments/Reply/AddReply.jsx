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

export default function AddReply({ postId, commentId, targetName }) {
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
    <div className="mt-2" ref={emojiPickerRef}>
      <p className="mb-1 text-[11px] font-semibold text-slate-500">
        Replying to <span className="text-[#1877f2]">{targetName}</span>
      </p>
      
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex items-start gap-2"
      >
        {/* صورة بروفايل أصغر للردود */}
        <img
          src={photo}
          alt={name}
          className="h-7 w-7 mt-0.5 shrink-0 rounded-full object-cover shadow-sm bg-slate-100"
        />

        {/* حاوية الإدخال الرمادية */}
        <div className="flex-1 min-w-0 rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 transition-all focus-within:border-[#c7dafc] focus-within:bg-white shadow-sm">
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
                className="absolute -right-2 -top-2 rounded-full bg-white text-slate-500 shadow-md hover:text-red-500"
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
            className="w-full resize-none bg-transparent px-2 py-1 text-xs leading-5 outline-none placeholder:text-slate-500 max-h-[120px] min-h-[38px]"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* أيقونة الصورة */}
              <label
                className="inline-flex cursor-pointer items-center justify-center rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-emerald-600"
              >
                <IoImageOutline size={14} />
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="hidden"
                />
              </label>

              {/* أيقونة الإيموجي */}
              <button
                type="button"
                onClick={() => setShowEmoji((prev) => !prev)}
                className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors ${
                  showEmoji
                    ? "text-amber-500 bg-amber-50"
                    : "text-slate-500 hover:bg-slate-200 hover:text-amber-500"
                }`}
              >
                <Smile size={14} />
              </button>
            </div>

            {/* زر الإرسال */}
            <button
              disabled={isPending || isFormEmpty}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition-all hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
            >
              {isPending ? (
                <Oval
                  height={14}
                  width={14}
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
