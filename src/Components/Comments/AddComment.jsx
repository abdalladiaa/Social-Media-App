import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { IoSendSharp } from "react-icons/io5";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { TbXboxX } from "react-icons/tb";

export default function AddComment({postId}) {
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
    formData.append("content", values.content || "  ");
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    try {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/comments`,
        formData,
        headersObjData()
      );
      reset();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const { mutate, isPending } = useGenericMutation(
    addComment,
    ["comments", postId],
    "Comment Added Successfully",
    "Comment Doesn't Poste"
  );

  return (
    <form className="flex items-start gap-2 sticky bottom-0 " onSubmit={handleSubmit(mutate)}>
      <img
        alt={name}
        className="h-9 w-9 rounded-full object-cover"
        src={photo}
      />
      <div
        className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
        data-comment-mention-root="true"
      >
        <textarea
          {...register("content")}
          placeholder={`Comment as ${name}...`}
          rows={1}
          className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
        />

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <label
              htmlFor="comment-image"
              className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image"
                aria-hidden="true"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                <circle cx={9} cy={9} r={2} />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </label>
            <input
              id="comment-image"
              {...register("image")}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </div>

          <button
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
            disabled={isPending || isFormEmpty}
          >
            {isPending ? (
              <Oval
                visible={true}
                height={20}
                width={20}
                color="white"
                secondaryColor="rgba(255,255,255,0.4)"
                strokeWidth={4}
                ariaLabel="oval-loading"
              />
            ) : (
              <IoSendSharp />
            )}
          </button>
        </div>

        {/* معاينة الصورة */}
        {imageValue && imageValue.length > 0 && (
          <div className="relative mt-2 mb-2">
            <img
              src={URL.createObjectURL(imageValue[0])}
              alt="Preview"
              className="max-h-40 w-full rounded-lg object-cover border border-[#E2E8F0]"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm hover:bg-black/80 transition-colors cursor-pointer"
            >
              <TbXboxX size={16} />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}