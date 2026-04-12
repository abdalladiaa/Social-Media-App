import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { headersObjData } from "../../Helper/HeadersObj";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useLikeComment } from "../../CustomHooks/usePostComments";
import ImagePreview from "../PostCard/ImagePreview";
import CommentReply from "./Reply/CommentReply";

export default function Comment({ comment, post, isReply = false }) {
  const { _id: postId } = post;
  const { _id: commentId, likes, commentCreator, repliesCount } = comment;
  const { userData } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const isCommentOwner = commentCreator?._id === userData?.id;
  const isPostOwner = post?.user?._id === userData?.id;
  const canManageComment = isCommentOwner || isPostOwner;

  //! Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatedPostDate = comment.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: false })
    : "";

  // Delete Mutation
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useGenericMutation(
      async () => {
        await axios.delete(
          `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
          headersObjData(),
        );
        setMenuOpen(false);
      },
      ["comments", postId],
      "Comment Deleted Successfully",
    );

  const { register, handleSubmit, setValue } = useForm();

  function handleCommentUpdateBtn() {
    setShowUpdateInput(true);
    setMenuOpen(false);
    setValue("content", comment.content);
  }

  // Update Mutation
  const { mutate: updateMutate, isPending: updateIsPending } =
    useGenericMutation(
      async (values) => {
        const formData = new FormData();
        formData.append("content", values.content);
        await axios.put(
          `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
          formData,
          headersObjData(),
        );
        setShowUpdateInput(false);
      },
      ["comments", postId],
      "Comment Updated Successfully",
    );

  // Like Logic
  const { mutate: likeCommentMutate, isPending: likeCommentIsPending } =
    useLikeComment(postId, commentId);
  const isLiked = likes?.some((id) => id === userData?.id);

  // ==========================IMAGE PREVIEW==================================

  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  // =======================REPLY=========================
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="group relative flex items-start gap-2 mb-3">
      {/* 1. Profile Image */}
      <Link to={`/profile/${commentCreator?._id}`} className="shrink-0">
        <img
          alt={commentCreator?.name}
          className="h-8 w-8 rounded-full object-cover shadow-sm transition-transform hover:scale-105"
          src={commentCreator?.photo}
        />
      </Link>

      {/* 2. Comment Content Wrapper */}
      <div className="min-w-0 flex-1">
        <div className="relative inline-block max-w-[100%] rounded-2xl bg-[#f0f2f5] px-3 py-2 transition-all">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/profile/${commentCreator?._id}`}
                className="text-xs font-bold text-slate-900 hover:underline"
              >
                {commentCreator?.name}
              </Link>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">
                @{commentCreator?.name?.split(" ").join("_").toLowerCase()} ·{" "}
                {formatedPostDate}
              </p>
            </div>
          </div>

          {!showUpdateInput ? (
            <p className="mt-1 whitespace-pre-wrap break-words text-[13px] leading-snug text-slate-800">
              {comment.content}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(updateMutate)}
              className="mt-2 min-w-[200px]"
            >
              <input
                {...register("content")}
                autoFocus
                className="w-full rounded-xl border border-blue-100 bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-blue-500/10"
              />
              <div className="mt-2 flex justify-end gap-2 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setShowUpdateInput(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-blue-600 uppercase hover:text-blue-700"
                >
                  {updateIsPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          )}

          {comment.image && !showUpdateInput && (
            <img
              onClick={() => setIsImagePreviewOpen(true)}
              src={comment.image}
              alt="attachment"
              className="mt-2 cursor-pointer max-h-60 w-full rounded-xl object-cover border border-white/50"
            />
          )}

          {/* More Actions Menu */}
          {canManageComment && !showUpdateInput && (
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-all bg-white/40 backdrop-blur-sm"
              >
                <MoreHorizontal size={14} />
              </button>

              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute left-0 mt-1 z-30 w-32 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl py-1 animate-in fade-in zoom-in-95 duration-200"
                >
                  {isCommentOwner && (
                    <button
                      onClick={handleCommentUpdateBtn}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <IoPencilOutline size={14} className="text-blue-500" />
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteMutate()}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-bold text-red-500 hover:bg-red-50"
                  >
                    <IoTrashOutline size={14} />
                    {deleteIsPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Footer Actions */}
        <div className="mt-1 flex items-center justify-between px-1">
          <div className="flex items-center gap-4 text-[11px] font-semibold text-colorMain">
            <span className="text-slate-400 font-normal italic">
              {formatedPostDate}
            </span>

            <button
              disabled={likeCommentIsPending}
              onClick={() => likeCommentMutate()}
              className={`hover:underline transition-colors ${isLiked ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}
            >
              {likeCommentIsPending ? "Liking..." : `Like(${likes.length})`}
            </button>

            {!isReply && (
              <button
                onClick={() => setShowReply(!showReply)}
                className={`transition-colors hover:underline ${showReply ? "text-blue-600" : "text-slate-500 hover:text-blue-600"}`}
              >
                {showReply
                  ? "Hide replies"
                  : `Reply${repliesCount > 0 ? ` (${repliesCount})` : ""}`}
              </button>
            )}
          </div>
        </div>
        {/*===================COMMENT REPLY=========================== */}
        {showReply && !isReply && (
          <div>
            <CommentReply post={post} comment={comment} />
          </div>
        )}
      </div>
      {isImagePreviewOpen && (
        <ImagePreview
          image={comment.image}
          onClose={() => setIsImagePreviewOpen(false)}
        />
      )}
    </div>
  );
}
