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
  ExternalLink,
} from "lucide-react";
import { deletePostFunc } from "../../utils/PostCardFunctions/deletePostFunc";
import { likePostFunc } from "../../utils/PostCardFunctions/LikePostFunc";
import { SavePostFunc } from "../../utils/PostCardFunctions/SavePostFunc";
import SharePostComp from "../SharePost/SharePostComp";

export default function PostCard({ post, isDetails = false }) {
  const { userData } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [showShareComp, setShowShareComp] = useState(false);
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
    sharedPost,
  } = post;

  const sharedPostImage = sharedPost?.image;

  const { name: userName, photo: UserPhoto, _id: userId } = post?.user || {};
  const isLiked = likes?.some((id) => id === userData?.id);

  // isSaved مع rollback لو الـ mutation فشل
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

  // --- Mutations ---

  // 1. Delete Post
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

  // 3. Save Post - مع rollback لو فشل
  const { mutate: savePostMutate, isPending: savePostIsPending } =
    useGenericMutation(() => SavePostFunc(postId), ["allPosts", "userPosts"]);

  const handleSavePost = () => {
    const prevSaved = isSaved;
    setIsSaved(!isSaved); // optimistic update
    setMenuOpen(false);
    savePostMutate(undefined, {
      onError: () => setIsSaved(prevSaved), // rollback لو فشل
    });
  };

  // 4. Update Post
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { body: "", privacy: "" },
  });

  const watchPrivacy = watch("privacy");

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
    return data;
  }

  const { mutate: updateMutate, isPending: updateIsPending } =
    useGenericMutation(
      updatePost,
      ["allPosts", "userPosts"],
      "Post Updated Successfully",
      "Post Doesn't Update",
    );

  const onUpdateSubmit = (data) => {
    updateMutate(data, {
      onSuccess: () => setShowUpdateInput(false),
    });
  };

  // --- Comments ---
  const { data: commentsData, isLoading: commentsIsLoading } = usePostComments(
    postId,
    isDetails || isCommentsOpen,
  );
  const postComments = commentsData?.data?.comments || [];

  return (
    <>
      <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm mb-5 transition-all">
        <div className="p-4">
          {/* --- Header --- */}
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
                  <button
                    type="button"
                    className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline cursor-pointer"
                  >
                    {createdAt
                      ? formatDistanceToNow(new Date(createdAt), {
                          addSuffix: true,
                        }).replace("about ", "")
                      : "just now"}
                  </button>
                </span>
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
                      onClick={handleSavePost}
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
              <>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                  {body}
                </p>
                {/* Shared Post - مرة واحدة بس هنا */}
                {sharedPost && (
                  <div className="mt-3">
                    <SharedPostPreview
                      sharedPost={sharedPost}
                      setPreviewImage={setPreviewImage}
                    />
                  </div>
                )}
              </>
            ) : (
              <form
                onSubmit={handleSubmit(onUpdateSubmit)}
                className="animate-in fade-in slide-in-from-top-2"
              >
                <div className="relative flex items-center mb-3 w-fit group">
                  <div className="absolute left-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                    {watchPrivacy === "only_me" ? (
                      <Lock size={11} />
                    ) : watchPrivacy === "following" ? (
                      <Users size={11} />
                    ) : (
                      <Earth size={11} />
                    )}
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
                  maxLength="5000"
                  className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all ring-[#1877f2]/20 focus:border-[#1877f2] focus:ring-2 resize-none"
                />

                <div className="mt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUpdateInput(false)}
                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateIsPending}
                    className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#166fe5] disabled:opacity-60"
                  >
                    {updateIsPending ? "Saving..." : "Save"}
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
            onClick={() => setPreviewImage(postPhoto)}
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
          <button
            onClick={() => setShowShareComp(true)}
            className="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
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
        {isDetails && (
          <CommentCard
            commentsIsLoading={commentsIsLoading}
            comment={postComments}
            isDetails={true}
            post={post}
          />
        )}

        {/* --- Modals --- */}
        {previewImage && (
          <ImagePreview
            image={previewImage}
            onClose={() => setPreviewImage(null)}
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

      {showShareComp && (
        <SharePostComp
          postId={postId}
          setShowShareComp={setShowShareComp}
          originalPost={post}
        />
      )}
    </>
  );
}

// --- Shared Post Preview ---
function SharedPostPreview({ sharedPost, setPreviewImage }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
      <div className="p-3">
        <div className="mb-2 flex items-center gap-2">
          <img
            src={
              sharedPost?.user?.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
            alt={sharedPost?.user?.name || "User"}
            className="h-9 w-9 rounded-full object-cover shadow-sm bg-white border border-slate-200"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 leading-none capitalize">
              {sharedPost?.user?.name}
            </p>
            <p className="truncate text-[11px] font-medium text-slate-500 mt-1">
              @{sharedPost?.user?.name?.split(" ")[0].toLowerCase()}
            </p>
          </div>
          <Link
            to={`/details/${sharedPost?._id}`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff]"
          >
            Original Post
            <ExternalLink size={13} strokeWidth={2.5} />
          </Link>
        </div>
        <div className="px-1">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 line-clamp-4">
            {sharedPost?.body}
          </p>
        </div>
      </div>
      {sharedPost?.image && (
        <div className="border-t border-slate-200 bg-white">
          <button
            onClick={() => setPreviewImage(sharedPost.image)}
            type="button"
            className="group relative block w-full cursor-pointer"
          >
            <img
              src={sharedPost?.image}
              alt="Original post attachment"
              className="max-h-[560px] w-full object-cover transition-opacity hover:opacity-95"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
          </button>
        </div>
      )}
    </div>
  );
}
