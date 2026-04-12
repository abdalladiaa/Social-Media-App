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

  const isFormEmpty = !content?.trim() && !image?.[0];

  const removeImage = () => setValue("image", null);

  const onEmojiClick = (emojiData) => {
    setValue("content", (content || "") + emojiData.emoji);
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const addComment = async (values) => {
    const formData = new FormData();


    if (values.content?.trim()) {
      formData.append("content", values.content.trim());
    }

    if (values.image?.[0]) {
      formData.append("image", values.image[0]);
    }

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
        className="flex items-end gap-3 rounded-b-2xl border-t border-gray-50 bg-white p-3"
      >
        <img
          src={photo}
          alt={name}
          className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-gray-100"
        />

        <div className="flex-1 rounded-[1.25rem] border border-gray-100 bg-gray-50 transition-all focus-within:border-blue-200">
          {preview && (
            <div className="p-2 pb-0">
              <div className="relative h-20 w-20">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 rounded-full bg-white text-gray-500 shadow-md hover:text-red-500"
                >
                  <IoCloseCircle size={22} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center px-3">
            <textarea
              {...register("content")}
              rows={1}
              placeholder="Write a comment..."
              className="flex-1 min-h-[40px] max-h-32 resize-none bg-transparent py-2.5 text-sm outline-none"
              onInput={autoResize}
            />

            <div className="flex items-center gap-1">
              <label
                htmlFor={`comment-image-${postId}`}
                className="cursor-pointer p-2 text-gray-400 transition-colors hover:text-blue-500"
              >
                <IoImageOutline size={20} />
              </label>

              <input
                id={`comment-image-${postId}`}
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => setShowEmoji((prev) => !prev)}
                className={`p-2 transition-colors ${
                  showEmoji
                    ? "text-amber-500"
                    : "text-gray-400 hover:text-amber-500"
                }`}
              >
                <Smile size={20} />
              </button>
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isFormEmpty}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all enabled:hover:bg-blue-700 enabled:active:scale-90 disabled:bg-gray-200"
        >
          {isPending ? (
            <Oval
              height={18}
              width={18}
              color="white"
              secondaryColor="transparent"
              strokeWidth={4}
            />
          ) : (
            <IoSend size={18} />
          )}
        </button>
      </form>


      {showEmoji && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full right-0 z-50 mb-2 overflow-hidden rounded-2xl border shadow-2xl"
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={300}
            height={400}
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}
