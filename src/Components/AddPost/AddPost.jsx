import React, { useContext } from "react";
import { FaImage } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

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

  const isFormEmpty =
    !bodyValue?.trim() && (!imageValue || imageValue.length === 0);

  async function addPost(values) {
    const formData = new FormData();
    formData.append("body", values.body || " ");
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        headersObjData(),
      );
      reset();
      return response;
    } catch (err) {
      throw err;
    }
  }

  const { mutate, isPending } = useGenericMutation(
    addPost,
    ["allPosts", "userPosts"],
    "Post added successfully!",
    "Failed to add post",
  );

  const removeImage = () => {
    setValue("image", null);
  };

  return (
    <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 w-full transition-all hover:shadow-md">
      <form onSubmit={handleSubmit(mutate)} className="space-y-4">
        {/* Input Section */}
        <div className="flex gap-4">
          <Link to={"/profile"} className="shrink-0">
            <div className="relative group">
              <img
                src={userData?.photo}
                alt={userData?.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-gray-50 group-hover:ring-blue-100 transition-all"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          <div className="flex-1">
            <textarea
              {...register("body")}
              rows="3"
              placeholder={`What's on your mind, ${userData?.name?.split(" ")[0]}?`}
              className="w-full p-0 text-lg text-gray-800 placeholder:text-gray-400 bg-transparent border-none resize-none focus:ring-0 focus:outline-none min-h-[80px]"
            />
          </div>
        </div>

        {/* Image Preview Area */}
        {imageValue && imageValue.length > 0 && (
          <div className="relative group animate-in zoom-in-95 duration-300">
            <img
              src={URL.createObjectURL(imageValue[0])}
              alt="Preview"
              className="max-h-[350px] w-full rounded-2xl object-cover border border-gray-100 shadow-sm"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all scale-100 group-hover:scale-110"
            >
              <IoCloseCircle size={24} />
            </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <input
              type="file"
              accept="image/*"
              id="postImage"
              className="hidden"
              {...register("image")}
            />
            <label
              htmlFor="postImage"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer font-medium"
            >
              <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600">
                <FaImage size={18} />
              </div>
              <span className="hidden sm:inline">Add Photo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending || isFormEmpty}
            className="relative px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl overflow-hidden transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed!"
          >
            <span className={isPending ? "opacity-0" : "opacity-100"}>
              Post
            </span>
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
