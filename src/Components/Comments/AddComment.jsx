import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { IoSend, IoImageOutline, IoCloseCircle } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export default function AddComment({ postId }) {
  const { userData } = useContext(AuthContext);
  const { photo, name } = userData;

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      content: "",
      image: null,
    },
  });

  const bodyValue = watch("content");
  const imageValue = watch("image");
  const isFormEmpty =
    !bodyValue?.trim() && (!imageValue || imageValue.length === 0);

  const removeImage = () => {
    setValue("image", null);
    const fileInput = document.getElementById("comment-image");
    if (fileInput) fileInput.value = "";
  };

  async function addComment(values) {
    const formData = new FormData();
    formData.append("content", values.content || " ");
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      headersObjData(),
    );
    reset();
    return data;
  }

  const { mutate, isPending } = useGenericMutation(
    addComment,
    ["comments", postId],
    "Comment shared! 💬",
    "Failed to send comment",
  );

  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 pt-3 pb-1">
      <form className="flex items-end gap-3" onSubmit={handleSubmit(mutate)}>
        {/* User Avatar */}
        <img
          alt={name}
          className="h-9 w-9 rounded-xl object-cover shadow-sm ring-1 ring-gray-200 mb-1"
          src={photo}
        />

        {/* Input Container */}
        <div className="flex-1 bg-gray-100/50 rounded-[1.25rem] border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-sm transition-all duration-200 overflow-hidden">
          {/* Image Preview inside the box */}
          {imageValue && imageValue.length > 0 && (
            <div className="p-2 pb-0">
              <div className="relative inline-block group">
                <img
                  src={URL.createObjectURL(imageValue[0])}
                  alt="Preview"
                  className="h-20 w-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1.5 -right-1.5 bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <IoCloseCircle size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center px-3 py-1">
            <textarea
              {...register("content")}
              placeholder={`Write a comment...`}
              rows={1}
              className="flex-1 max-h-32 min-h-[38px] w-full resize-none bg-transparent py-2.5 text-sm leading-tight outline-none placeholder:text-gray-400 text-gray-700"
              onInput={(e) => {
                e.target.style.height = "inherit";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />

            {/* Image Upload Icon */}
            <div className="flex items-center self-end mb-1.5">
              <label
                htmlFor="comment-image"
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
              >
                <IoImageOutline size={20} />
              </label>
              <input
                id="comment-image"
                {...register("image")}
                className="hidden"
                type="file"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Send Button */}
        <button
          className="mb-1 cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700 active:scale-90 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          disabled={isPending || isFormEmpty}
        >
          {isPending ? (
            <Oval
              visible={true}
              height={18}
              width={18}
              color="currentColor"
              secondaryColor="rgba(255,255,255,0.3)"
              strokeWidth={5}
            />
          ) : (
            <IoSend size={18} />
          )}
        </button>
      </form>
    </div>
  );
}
