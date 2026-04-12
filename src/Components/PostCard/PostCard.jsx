import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import usePostComments from "../../CustomHooks/usePostComments";
import CommentCard from "../Comments/CommentCard";
import ImagePreview from "./ImagePreview";
import AllComments from "../Comments/AllComments";
import { headersObjData } from "../../Helper/HeadersObj";
import {
  Earth,
  Ellipsis,
  ThumbsUp,
  MessageCircle,
  Share2,
  Repeat2,
  ChevronDown,
  Bookmark,
  Edit2,
  Trash2,
  Lock,
  Users,
} from "lucide-react";
import { deletePostFunc } from "../../utils/PostCardFunctions/deletePostFunc";
import { likePostFunc } from "../../utils/PostCardFunctions/LikePostFunc";
import { SavePostFunc } from "../../utils/PostCardFunctions/SavePostFunc";

export default function PostCard({ post, isDetails = false }) {

  const { userData } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const menuRef = useRef(null);

  const {
    body,
    createdAt,
    _id: postId,
    image: postPhoto,
    sharesCount,
    topComment,
    likes,
    commentsCount,
    privacy,
    bookmarked,
  } = post;

  const { name: userName, photo: UserPhoto, _id: userId } = post?.user || {};
  const isLiked = likes?.some((id) => id === userData?.id);
  const [isSaved, setIsSaved] = useState(bookmarked);

  // --- Close Menu on Outside Click ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Mutations (Logic) ---

  // 1. Delete Post (بدون رسالة تأكيد)
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useGenericMutation(
      () => deletePostFunc(postId),
      ["allPosts", "userPosts"],
      "Deleted Successfully",
      "Post Doesn't Deleted",
    );

  // 2. Like Post
  const { mutate: likePostMutate, isPending: likePostIsPending } =
    useGenericMutation(() => likePostFunc(postId), ["allPosts", "userPosts"]);

  // 3. Save Post
  const { mutate: savePostMutate, isPending: savePostIsPending } =
    useGenericMutation(() => SavePostFunc(postId), ["allPosts", "userPosts"]);

  // 4. Update Post
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { body: "", privacy: "" },
  });

  function handlePostUpdateBtn() {
    setValue("body", body);
    setValue("privacy", privacy || "public");
    setShowUpdateInput(true);
    setMenuOpen(false);
  }

  async function updatePost(values) {
    const formData = new FormData();
    formData.append("body", values.body);
    formData.append("privacy", values.privacy);
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      formData,
      headersObjData(),
    );
    setShowUpdateInput(false);
    return data;
  }

  const { mutate: updateMutate, isPending: updateIsPending } =
    useGenericMutation(
      updatePost,
      ["allPosts", "userPosts"],
      "Post Updated Successfully",
      "Post Doesn't Update",
    );

  // --- Comments Logic ---
  const { data: commentsData, isLoading: commentsIsLoading } = usePostComments(
    postId,
    isDetails || isCommentsOpen,
  );
  const postComments = commentsData?.data?.comments || [];

  return (
    <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm mb-5 transition-all">
      <div className="p-4">
        {/* --- Header Section --- */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${userId}`} className="shrink-0">
            <img
              alt={userName}
              className="h-11 w-11 rounded-full object-cover border border-slate-100"
              src={
                UserPhoto ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              to={`/profile/${userId}`}
              className="truncate text-sm font-bold text-slate-900 hover:underline capitalize"
            >
              {userName}
            </Link>
            <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500 font-medium">
              <span>@{userName?.split(" ")[0].toLowerCase()}</span>
              <span>·</span>
              <span className="hover:underline">
                {createdAt
                  ? formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    }).replace("about ", "")
                  : "just now"}
              </span>

              {/* Privacy Display in Header */}
              <span className="mx-1">·</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="shrink-0">
                  {privacy === "only_me" ? (
                    <Lock size={10} />
                  ) : privacy === "following" ? (
                    <Users size={10} />
                  ) : (
                    <Earth size={10} />
                  )}
                </div>
                <span className="text-[11px] font-bold capitalize leading-none">
                  {privacy === "public"
                    ? "Public"
                    : privacy === "following"
                      ? "Followers"
                      : "Only me"}
                </span>
              </div>
            </div>
          </div>

          {/* Context Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer active:scale-90"
            >
              <Ellipsis size={20} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 z-[100] mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col p-1.5">
                  <button
                    disabled={savePostIsPending}
                    onClick={() => {
                      setIsSaved(!isSaved);
                      savePostMutate();
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors ${isSaved ? "text-blue-600 bg-blue-50/50" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <Bookmark
                      size={18}
                      className={isSaved ? "fill-blue-600" : ""}
                    />
                    {isSaved ? "Saved" : "Save Post"}
                  </button>
                  {userData?.id === userId && (
                    <>
                      <div className="my-1 h-px bg-slate-100 mx-2" />
                      <button
                        onClick={handlePostUpdateBtn}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <Edit2 size={18} /> Edit Post
                      </button>

                      {/* زرار المسح المباشر */}
                      <button
                        disabled={deleteIsPending}
                        onClick={() => {
                          deleteMutate();
                          setMenuOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                        <span>
                          {deleteIsPending ? "Deleting..." : "Delete Post"}
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Content / Body --- */}
        <div className="mt-3">
          {!showUpdateInput ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
              {body}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit(updateMutate)}
              className="animate-in fade-in slide-in-from-top-2"
            >
              {/* Privacy Selector in Update Form */}
              <div className="relative flex items-center mb-3 w-fit group">
                <div className="absolute left-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                  <Earth size={11} />
                </div>

                <select
                  className="appearance-none bg-slate-100/80 border border-slate-200 text-[12px] font-bold text-slate-600 py-1.5 pl-8 pr-8 rounded-lg cursor-pointer outline-none transition-all hover:bg-slate-200 focus:ring-2 focus:ring-blue-500/10"
                  {...register("privacy")}
                >
                  <option value="public">public</option>
                  <option value="following">followers</option>
                  <option value="only_me">only me</option>
                </select>

                <div className="absolute right-2.5 text-slate-400 pointer-events-none">
                  <ChevronDown size={10} />
                </div>
              </div>

              <textarea
                {...register("body")}
                className="w-full min-h-[100px] rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateInput(false)}
                  className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700"
                >
                  {updateIsPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* --- Image --- */}
      {postPhoto && !showUpdateInput && (
        <div
          className="cursor-pointer border-t border-slate-50 overflow-hidden"
          onClick={() => setIsImagePreviewOpen(true)}
        >
          <img
            src={postPhoto}
            alt="post"
            className="w-full max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      )}

      {/* --- Footer Stats --- */}
      <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
              <ThumbsUp size={12} fill="white" />
            </span>
            <button className="font-semibold hover:text-[#1877f2] hover:underline transition-colors">
              {likes?.length || 0} likes
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Repeat2 size={13} /> {sharesCount || 0} shares
            </span>
            <span>{commentsCount || 0} comments</span>
          <Link
            to={`/details/${postId}`}
            className="flex items-center justify-center rounded-md py-2.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>View Details</span>
          </Link>
          </div>
        </div>
      </div>

      <div className="mx-4 border-t border-slate-200" />

      {/* --- Bottom Actions --- */}
      <div className="grid grid-cols-3 gap-1 p-1">
        <button
          onClick={() => likePostMutate()}
          disabled={likePostIsPending}
          className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold transition-all cursor-pointer ${isLiked ? "text-[#1877f2] bg-blue-50/50" : "text-slate-600 hover:bg-slate-100"}`}
        >
          <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} />
          <span>{likePostIsPending ? "liking..." : "Like"}</span>
        </button>
        <button
          onClick={() => setIsCommentsOpen(true)}
          className="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* --- Top Comment (Preview) --- */}
      {!isDetails && topComment && !isCommentsOpen && (
        <CommentCard
          comment={topComment}
          post={post}
          onOpenComments={() => setIsCommentsOpen(true)}
        />
      )}
      {isDetails && <CommentCard commentsIsLoading = {commentsIsLoading} comment={postComments} isDetails={true} post={post} />}

      {/* --- Overlays/Modals --- */}
      {isImagePreviewOpen && (
        <ImagePreview
          image={postPhoto}
          onClose={() => setIsImagePreviewOpen(false)}
        />
      )}

      {isCommentsOpen && (
        <AllComments
          postId={postId}
          onClose={() => setIsCommentsOpen(false)}
          isLoading={commentsIsLoading}
          post={post}
          comments={postComments}
        />
      )}
    </article>
  );
}
