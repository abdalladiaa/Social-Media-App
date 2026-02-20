import React, { useContext } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { TbXboxX } from "react-icons/tb";

export default function AddPost() {
  const { userData } = useContext(AuthContext);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  const bodyValue = watch("body");
  const imageValue = watch("image");
  console.log();

  const isFormEmpty =
    !bodyValue?.trim() && (!imageValue || imageValue.length === 0);

  async function addPost(values) {
    const formData = new FormData();
    formData.append("body", values.body || " ");
    if (values.image && values.image[0]) {
      console.log(values, "values");

      formData.append("image", values.image[0]);
    }
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        headersObjData(),
      );
      console.log(response, "response from AddPost");
      reset();
    } catch (err) {
      console.log(err, "From AddPost");
    }
  }

  const { mutate, isPending } = useGenericMutation(
    addPost,
    ["allPosts", "userPosts"],
    "Post Added Successfully",
    "Post Doesn't Posted",
  );

  const removeImage = () => {
    setValue("image", null);
  };



  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-5 mb-4 w-full ">
      <form onSubmit={handleSubmit(mutate)}>
        {/* Header: user avatar + input field */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={userData?.photo}
            alt={userData?.name}
            className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
          />

          <div className="flex-1">
            <textarea
              {...register("body")}
              rows="2"
              placeholder="What's on your mind?"
              className="w-full p-3 text-sm text-[#0B1733] bg-[#F7FAFF] border border-[#E2E8F0] rounded-xl resize-none focus:outline-none focus:border-[#0066FF] transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E2E8F0] my-3"></div>

        {/* Image preview (commented as requested) */}
        {imageValue && imageValue.length > 0 && (
          <div className="relative mt-2 mb-3">
            <img
              src={URL.createObjectURL(imageValue[0])}
              alt="Preview"
              className="max-h-60 w-full rounded-lg object-cover border border-[#E2E8F0]"
            />
            <button
              type="button"
              onClick={removeImage}
              className=" cursor-pointer absolute right-5 top-5 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm hover:bg-black/80 transition-colors"
            >
              <TbXboxX />
            </button>
          </div>
        )}

        {/* Actions: icons + post button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              id="postImage"
              className="hidden"
              {...register("image")}
            />
            <label
              htmlFor="postImage"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#61708A] hover:bg-[#F7FAFF] hover:text-[#0B1733] transition-colors cursor-pointer"
            >
              <FaImage className="text-lg" />
              <span className="text-sm font-medium">Photo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending || isFormEmpty}
            className=" cursor-pointer px-5 py-2 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#00C2A8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
