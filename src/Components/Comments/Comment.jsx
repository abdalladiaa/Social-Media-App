import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";
import { headersObjData } from "../../Helper/HeadersObj";
import { AuthContext } from "../../Context/AuthContext";

export default function Comment({ comment, post }) {
  const { userData } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  console.log(comment, "comment");
  console.log(userData, "userData");
  console.log(post, "post");

  //! Exit menu on outside click
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

  async function handleDelete() {
    try {
      const { data } = await axios.delete(
        `https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`,
        headersObjData(),
      );
      console.log(data, "handle delete");
      setMenuOpen(false);
    } catch (err) {
      console.log(err, "from delete comment");
    }
  }

  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useGenericMutation(
      handleDelete,
      ["comments", comment.post],
      "Comment Deleted Successfully",
      "Comment Dosn't Delete",
    );

  return (
    <div className="relative flex items-start gap-2 mb-2">
      <img
        alt={comment.commentCreator.name}
        className="mt-0.5 h-8 w-8 rounded-full object-cover"
        src={comment.commentCreator.photo}
      />
      <div className="min-w-0 flex-1">
        <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-slate-900">
                {comment.commentCreator.name}
              </p>
              {(comment.commentCreator.username && (
                <p className="text-xs text-slate-500 flex">
                  @{comment.commentCreator.username}
                </p>
              )) || <p className="text-xs text-slate-500 flex">member</p>}
            </div>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
            {comment.content}
          </p>
          {comment.image && (
            <img
              src={comment.image}
              alt="comment attachment"
              className="mt-2 max-h-60 w-full rounded-lg object-cover border border-[#E2E8F0]"
            />
          )}
        </div>

        <div className="mt-1.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-4 relative">
            <span className="text-xs font-semibold text-slate-400">
              {formatedPostDate}
            </span>
            <button className="text-xs font-semibold hover:underline disabled:opacity-60 text-slate-500">
              Like ({comment.likes.length})
            </button>
            <button className="text-xs font-semibold transition hover:underline disabled:opacity-60 text-slate-500 hover:text-[#1877f2]">
              Reply
            </button>
          </div>
          {(comment.commentCreator._id === userData.id ||
            post.user._id === userData.id) && (
            <>
              <button
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
              >
                <FaEllipsisV size={12} />
              </button>

              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-25 z-10 w-32 overflow-hidden rounded-lg border border-[#E2E8F0] bg-white py-1 shadow-lg"
                >
                  <button
                    onClick={deleteMutate}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-[#F7FAFF] transition-colors"
                  >
                    <FaTrash size={14} />
                    {deleteIsPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
