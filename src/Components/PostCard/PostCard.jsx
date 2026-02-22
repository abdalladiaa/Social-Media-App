import React, { useState, useRef, useEffect, useContext } from "react";
import { FaRegHeart, FaRegComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import { deletePostFunc } from "./deletePostFunc";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import CommenCard from "../Comments/CommentCard";
import { Link } from "react-router-dom";
import usePostComments from "../../CustomHooks/usePostComments";
import LoadingComments from "../Comments/LoadingComments";
import CommentCard from "../Comments/CommentCard";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import ImagePreview from "./ImagePreview";
import { useForm } from "react-hook-form";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import AllComments from "../Comments/AllComments";
import { likePostFunc } from "./LikePostFunc";

export default function PostCard({ post, isDetailes = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { userData } = useContext(AuthContext);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const openImagePreview = () => setIsImagePreviewOpen(true);
  const closeImagePreview = () => setIsImagePreviewOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    body,
    createdAt,
    id: postId,
    image: postPhoto,
    sharesCount,
    topComment,
    likes,
    commentsCount,
  } = post;

  console.log(likes, "likes");

  const { name: userName, photo: UserPhoto, _id: userId } = post?.user;

  const formatedPostDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";

  //!==================DELETE POST===================================

  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useGenericMutation(
      () => deletePostFunc(postId),
      ["allPosts", "userPosts"],
      "Deleted Successfully",
      "Post Doesn't Deleted",
    );

  // controls for comments preview modal and lazy fetching
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const openComments = () => setIsCommentsOpen(true);
  const closeComments = () => setIsCommentsOpen(false);

  const {
    data,
    isLoading: commentsIsLoading,
    isFetched: commentsIsFetched,
  } = usePostComments(postId, isDetailes || isCommentsOpen);
  const postComments = data?.data?.comments;

  //! ==========================Update Post============================

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      body: "",
    },
  });

  function handleCommentUpdateBtn() {
    setValue("body", body);
    setShowUpdateInput(true);
    setMenuOpen(false);
  }

  async function updatePost(values) {
    const formData = new FormData();
    formData.append("body", values.body);
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}`,
        formData,
        headersObjData(),
      );
      setShowUpdateInput(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const { mutate: updateMutate, isPending: updateIsPending } =
    useGenericMutation(
      updatePost,
      ["allPosts", "userPosts"],
      "Post Updated Successfully",
      "Post Doesn't Update",
    );

  // !===========================LIKE POST=============================

  const { mutate: likePostMutate, isPending: likePostIsPending } =
    useGenericMutation(() => likePostFunc(postId), ["allPosts", "userPosts"]);

  const isLiked = likes?.some((id) => id === userData?.id);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-5 mb-4 transition hover:shadow-md w-full mx-auto">
      {/* Header: user info + timestamp */}
      <div className="p-3">
        <div className={`flex items-start justify-between mb-3`}>
          <div className="flex items-center gap-3">
            {/* User avatar */}
            <img
              src={UserPhoto}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
            />
            <div>
              <h3 className="font-semibold text-[#0B1733]">{userName}</h3>
              <p className="text-xs text-[#61708A]">{formatedPostDate}</p>
            </div>
          </div>

          {/* Three dots button with menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-1.5 text-[#61708A] hover:bg-[#F7FAFF] hover:text-[#0B1733] transition-colors"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-ellipsis"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white  shadow-lg">
                <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-[#0B1733] hover:bg-[#F7FAFF] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                    aria-hidden="true"
                  >
                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>
                  </svg>
                  Save post
                </button>
                {userData?.id === userId && (
                  <>
                    <button
                      onClick={handleCommentUpdateBtn}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-yellow-500 hover:bg-yellow-50 transition-colors"
                    >
                      <MdModeEdit size={15} />
                      Update Post
                    </button>
                    <button
                      onClick={deleteMutate}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <MdDeleteOutline size={15} />
                      {deleteIsPending ? "Deleting..." : "Delete Post"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post content */}
        <p
          className={`text-[#0B1733] mb-3 overflow-hidden w-full wrap-break-word ${!!showUpdateInput && "hidden"}`}
        >
          {body}
        </p>
        <form
          onSubmit={handleSubmit(updateMutate)}
          className={`mt-3  ${!showUpdateInput && "hidden"}`}
        >
          <textarea
            maxLength={5000}
            className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2"
            {...register("body")}
          />
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowUpdateInput(false);
                reset();
              }}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#166fe5] disabled:opacity-60"
            >
              {updateIsPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Post image */}
      {postPhoto && (
        <div
          onClick={openImagePreview}
          className=" cursor-pointer max-h-155 rounded-xl overflow-hidden mb-3 border border-[#E2E8F0]"
        >
          <img
            src={postPhoto}
            alt={body || "post image"}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/*//! (likes, comments) */}
      <div className="flex items-center justify-between text-sm text-[#61708A] border-t border-[#E2E8F0] pt-3 mt-2">
        <span className="flex items-center gap-2">
          {" "}
          <AiFillLike className="text-blue-600" /> {likes.length} likes{" "}
        </span>
        <div className="flex gap-x-5">
          <span className="flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-repeat2 lucide-repeat-2"
              aria-hidden="true"
            >
              <path d="m2 9 3-3 3 3"></path>
              <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
              <path d="m22 15-3 3-3-3"></path>
              <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
            </svg>
            {"  "}
            {sharesCount} shares
          </span>
          <span>{commentsCount} comments</span>
          {!isDetailes && (
            <Link
              to={`/detailes/${postId}`}
              className="text-[#0066FF] text-xs font-bold cursor-pointer hover:text-[#00C2A8] transition-colors"
            >
              view detailes
            </Link>
          )}
        </div>
      </div>

      {/* Action buttons (static, no logic) */}
      <div className="flex items-center justify-around mt-2 py-2">
        {/* Like button */}
        <div
          onClick={() => likePostMutate()}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#61708A] cursor-pointer hover:bg-[#F7FAFF] hover:text-[#0B1733] transition-colors w-full ${!!isLiked && "bg-blue-50"} `}
        >
          {isLiked ? (
            <AiFillLike className="text-blue-600" />
          ) : (
            <AiOutlineLike className="text-lg" />
          )}

          <span>Like</span>
        </div>

        {/* Comment button */}
        <button
          onClick={openComments}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#61708A] cursor-pointer hover:bg-[#F7FAFF] hover:text-[#0B1733] transition-colors w-full"
        >
          <FaRegComment className="text-lg" />
          <span>Comment</span>
        </button>

        {/* Share button */}
        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#61708A] cursor-pointer hover:bg-[#F7FAFF] hover:text-[#0B1733] transition-colors w-full">
          <FaShare className="text-lg" />
          <span>Share</span>
        </div>
      </div>
      {!isDetailes && topComment && (
        <CommentCard
          comment={topComment}
          post={post}
          onOpenComments={openComments}
        />
      )}
      {isDetailes && commentsIsLoading && <LoadingComments />}
      {commentsIsFetched && isDetailes && postComments && (
        <CommenCard comment={postComments} isDetailes={true} post={post} />
      )}

      {/* //! Image Prevew */}
      {isImagePreviewOpen && (
        <ImagePreview image={postPhoto} onClose={closeImagePreview} />
      )}

      {/* Comments preview modal */}
      {isCommentsOpen && (
        <AllComments
          comments={postComments}
          onClose={closeComments}
          isLoading={commentsIsLoading}
          post={post}
        />
      )}
    </article>
  );
}
