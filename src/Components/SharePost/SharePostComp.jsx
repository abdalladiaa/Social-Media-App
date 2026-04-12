import React, { useState } from "react";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { headersObjData } from "../../Helper/HeadersObj";
import axios from "axios";

const sharepostFunc = async (postId, formData) => {
  return await axios.post(
    `https://route-posts.routemisr.com/posts/${postId}/share`,
    formData,
    headersObjData(),
  );
};

export default function SharePostComp({
  postId,
  setShowShareComp,
  originalPost,
}) {
  console.log(originalPost);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: "",
    },
  });

  async function SharePost(values) {
    const formData = new FormData();
    formData.append("body", values.body?.trim() || " ");

    const { data } = await sharepostFunc(postId, formData);
    return data;
  }

  const { mutate, isPending } = useGenericMutation(
    SharePost,
    ["allPosts", "userPosts"],
    "Post Shared successfully!",
    "Failed to Share post",
  );

  const handleFormSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setShowShareComp(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-[560px] rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h4 className="text-base font-extrabold text-slate-900">
            Share post
          </h4>
          <button
            type="button"
            onClick={() => setShowShareComp(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3 p-4">
          <textarea
            {...register("body")}
            placeholder="Say something about this..."
            rows="3"
            maxLength="500"
            className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1877f2] focus:ring-2 focus:ring-[#1877f2]/20 placeholder:text-slate-500"
          />

          <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-inner">
            <div className="flex items-center gap-2 p-3 pb-2">
              <img
                src={
                  originalPost?.user?.photo ||
                  "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                }
                alt={originalPost?.user?.name || "User"}
                className="h-8 w-8 rounded-full object-cover shadow-sm"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900 leading-none">
                  {originalPost?.user?.name}
                </p>
                <p className="truncate text-[11px] font-medium text-slate-500 mt-1">
                  @{originalPost?.user?.username}
                </p>
              </div>
            </div>

            <div className="px-3 pb-3">
              <p className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed line-clamp-3">
                {originalPost?.body}
              </p>
            </div>

            {originalPost?.image && (
              <div className="border-t border-slate-200 bg-white">
                <img
                  src={originalPost?.image}
                  alt="Original post attachment"
                  className="max-h-[250px] w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={() =>{ setShowShareComp(false) } }
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1877f2] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
          >
            {isPending ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            <span>{isPending ? "Sharing..." : "Share now"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
