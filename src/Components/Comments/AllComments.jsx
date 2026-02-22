import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Comment from "./Comment";
import LoadingComments from "./LoadingComments";
import AddComment from "./AddComment";

export default function AllComments({
  comments = [],
  onClose,
  isLoading = false,
  post,
}) {
  // lock background scroll while modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, []);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm "
      onClick={handleBackdropClick}
    >
      <div className="max-w-2xl w-full max-h-[80vh] overflow-auto rounded-lg bg-white px-4 relative mx-3">
        <div className="sticky top-0 z-99 bg-white p-3 flex items-center justify-between">
          <h3 className="mb-3 text-lg font-semibold">All Comments</h3>
          <button
            onClick={onClose}
            className=" cursor-pointer rounded-full bg-slate-100 p-1 text-slate-700 hover:bg-slate-200"
            aria-label="close"
          >
            <IoClose size={20} />
          </button>
        </div>

        {isLoading && <LoadingComments />}

        {!isLoading && (!comments || comments.length === 0) && (
          <p className="text-sm text-slate-500 my-2 font-bold ">No comments yet.</p>
        )}

        {!isLoading && comments && comments.length > 0 && (
          <div className="space-y-3">
            {comments.map((c) => (
              <Comment key={c._id} comment={c} post={post} />
            ))}
          </div>
        )}
        <AddComment postId={post?._id} />
      </div>
    </div>
  );
}
