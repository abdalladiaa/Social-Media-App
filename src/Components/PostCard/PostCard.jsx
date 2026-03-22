import React, { useState, useRef, useEffect, useContext } from "react";
import {
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaGlobeAmericas,
  FaChevronDown,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
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

import { deletePostFunc } from "./PostCardFunctions/deletePostFunc";
import { likePostFunc } from "./PostCardFunctions/LikePostFunc";
import { SavePostFunc } from "./PostCardFunctions/SavePostFunc";

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
    privacy,
    bookmarked,
  } = post;
  console.log(post);

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
      privacy: "",
    },
  });

  function handlePostUpdateBtn() {
    setValue("body", body);
    setShowUpdateInput(true);
    setValue("privacy", privacy);
    setMenuOpen(false);
  }

  async function updatePost(values) {
    const formData = new FormData();
    formData.append("body", values.body);
    formData.append("privacy", values.privacy);
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${postId}`,
        formData,
        headersObjData(),
      );
      setShowUpdateInput(false);
      return data;
    } catch (err) {
      throw err;
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

  // !=============================SAVE POST==============================

  const { mutate: savePostMutate, isPending: savePostIsPending } =
    useGenericMutation(() => SavePostFunc(postId), ["allPosts", "userPosts"]);
  const [isSaved, setIsSaved] = useState(bookmarked);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-5 transition-shadow hover:shadow-md w-full overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className={`flex items-start justify-between mb-3`}>
          <div className="flex items-center gap-3">
            {/* User avatar */}
            <div className="relative">
              <img
                src={UserPhoto}
                alt={userName}
                className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
              />
            </div>

            <div>
              <Link
                to={`/profile/${userId}`}
                className="cursor-pointer text-[15px] font-bold text-gray-900 leading-none hover:text-blue-600 transition-colors"
              >
                {userName}
              </Link>

              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-[12px] text-gray-500 font-medium">
                  {formatedPostDate}
                </p>

                <span className="text-gray-300">•</span>

                {/* Privacy Selector UI Only */}
                {userData?.id == userId && (
                  <div className="flex items-center gap-1.5 text-gray-400">
                    {/* الأيقونة الجانبية */}
                    <div className="shrink-0">
                      <FaGlobeAmericas size={10} />
                    </div>

                    {/* النص */}
                    <span className="text-[11px] font-bold capitalize leading-none">
                      {
                        {
                          public: "Public",
                          following: "Followers",
                          only_me: "Only me",
                        }[privacy]
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Three dots button with menu */}
          <div className="relative" ref={menuRef}>
            <button
            
              onClick={() => setMenuOpen(!menuOpen)}
              className=" cursor-pointer rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg py-1">
                <button
                  disabled={savePostIsPending}
                  onClick={() => {
                    setIsSaved(!isSaved);
                    savePostMutate();
                    setMenuOpen(false);
                  }}
                  className=" cursor-pointer flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                  {savePostIsPending
                    ? "Saving..."
                    : isSaved
                      ? "Unsave Post"
                      : "save Post"}
                </button>
                {userData?.id === userId && (
                  <>
                    <button
                      onClick={handlePostUpdateBtn}
                      className=" cursor-pointer flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <MdModeEdit size={16} className="text-gray-500" />
                      Update Post
                    </button>
                    <div className="h-px bg-gray-100 my-1 w-full"></div>
                    <button
                      onClick={deleteMutate}
                      className=" cursor-pointer flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <MdDeleteOutline size={16} />
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
          className={`text-gray-800 text-[15px] leading-relaxed mb-3 whitespace-pre-wrap wrap-break-word ${!!showUpdateInput && "hidden"}`}
        >
          {body}
        </p>

        <form
          onSubmit={handleSubmit(updateMutate)}
          className={`mt-3 mb-3 ${!showUpdateInput && "hidden"}`}
        >
          {/* Privacy Selector UI Only */}
          <div className="relative flex items-center mb-3 w-fit group">
            {/* الأيقونة الجانبية */}
            <div className="absolute left-2.5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
              <FaGlobeAmericas size={11} />
            </div>

            <select
              className="appearance-none bg-gray-100/80 border border-gray-200 text-[12px] font-bold text-gray-600 py-1.5 pl-8 pr-8 rounded-lg cursor-pointer outline-none transition-all hover:bg-gray-200 focus:ring-2 focus:ring-blue-500/10"
              {...register("privacy")}
            >
              <option value="public">public</option>
              <option value="following">followers</option>
              <option value="only_me">only me</option>
            </select>

            {/* سهم الاختيار */}
            <div className="absolute right-2.5 text-gray-400 pointer-events-none">
              <FaChevronDown size={9} />
            </div>
          </div>

          <textarea
            maxLength={5000}
            className="min-h-30 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-[15px] outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-y"
            {...register("body")}
          />

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowUpdateInput(false);
                reset();
              }}
              className=" cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {updateIsPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Post image */}
        {postPhoto && (
          <div
            onClick={openImagePreview}
            className="cursor-pointer rounded-xl overflow-hidden mt-3 mb-4 border border-gray-100 bg-gray-50"
          >
            <img
              src={postPhoto}
              alt={body || "post image"}
              className="w-full max-h-125 object-cover hover:opacity-95 transition-opacity"
            />
          </div>
        )}

        {/* likes, comments, shares */}
        <div className="flex items-center justify-between text-[13px] text-gray-500 py-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
            <div className="bg-blue-600 p-1 rounded-full text-white">
              <AiFillLike size={10} />
            </div>
            <span>{likes.length}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openComments}
              className="cursor-pointer hover:underline"
            >
              {commentsCount} comments
            </button>
            <span className="cursor-pointer hover:underline flex items-center gap-1">
              {sharesCount} shares
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-1 pt-2">
          {/* Like button */}
          <button
            disabled={likePostIsPending}
            onClick={() => likePostMutate()}
            className={` cursor-pointer flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg font-medium text-[14px] transition-colors ${
              isLiked
                ? "text-blue-600 bg-blue-50/50 hover:bg-blue-100"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {isLiked ? (
              <AiFillLike className="text-xl" />
            ) : (
              <AiOutlineLike className="text-xl text-gray-500" />
            )}
            <span>{likePostIsPending ? "Liking..." : "Like"}</span>
          </button>

          {/* Comment button */}
          <button
            onClick={openComments}
            className=" cursor-pointer flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-gray-600 font-medium text-[14px] hover:bg-gray-100 transition-colors"
          >
            <FaRegComment className="text-[18px] text-gray-500" />
            <span>Comment</span>
          </button>

          {/* Share button */}
          <button className=" cursor-pointer flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-gray-600 font-medium text-[14px] hover:bg-gray-100 transition-colors">
            <FaShare className="text-[18px] text-gray-500" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-3">
        {!isDetailes && (
          <div className="mt-2 flex justify-center">
            <Link
              to={`/detailes/${postId}`}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View detailed post
            </Link>
          </div>
        )}

        {!isDetailes && topComment && (
          <div className="mt-3">
            <CommentCard
              comment={topComment}
              post={post}
              onOpenComments={openComments}
            />
          </div>
        )}

        {isDetailes && commentsIsLoading && (
          <div className="mt-4">
            <LoadingComments />
          </div>
        )}

        {commentsIsFetched && isDetailes && postComments && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <CommentCard comment={postComments} isDetailes={true} post={post} />
          </div>
        )}
      </div>

      {/* Modals */}
      {isImagePreviewOpen && (
        <ImagePreview image={postPhoto} onClose={closeImagePreview} />
      )}

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
