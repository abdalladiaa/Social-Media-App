import React, { useContext } from "react";
import { FaImage, FaSmile, FaVideo } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";

export default function AddPost() {
  const { userData } = useContext(AuthContext);
  console.log(userData, "userData");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  async function addPost(values) {
    const formData = new FormData();
    formData.append("body", values.body);
    if (values.image) {
      formData.append("image", values.image[0]);
    }
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/posts",
        formData,
        headersObjData(),
      );
      console.log(response, "from AddPost");
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-5 mb-4 w-full max-w-xl mx-auto">
      {/* Header: user avatar + input field */}
      <form onSubmit={handleSubmit(mutate)}>
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

        {/* Actions: icons + post button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="file"
              {...register("image")}
              id="postImage"
              className="hidden"
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
            disabled={isPending}
            type="submit"
            className="px-5 py-2 bg-[#0066FF] text-white font-semibold rounded-xl hover:bg-[#00C2A8] transition-colors"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
