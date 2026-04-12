import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Comment from "./Comment";
import LoadingComments from "./LoadingComments";
import AddComment from "./AddComment";
import { MessageCircle } from "lucide-react";

export default function AllComments({
  comments = [],
  onClose,
  isLoading = false,
  post,
}) {
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

  // redirect wheel events that happen on the backdrop into the modal's scrollable container
  const scrollRef = useRef(null);
  const handleBackdropWheel = (e) => {
    // if the wheel event started inside the scrollable content, allow normal behavior
    if (scrollRef.current && scrollRef.current.contains(e.target)) return;
    if (!scrollRef.current) return;

    // scroll the modal content by the wheel delta and prevent the page from scrolling
    scrollRef.current.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/40 p-0 sm:p-4"
      onClick={handleBackdropClick}
      onWheel={handleBackdropWheel}
    >
      <div className="relative w-full max-w-xl bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col h-[90vh] sm:max-h-[85vh] overflow-hidden">
        {/* --- Header: Clean & Static --- */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              Comments
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                {comments.length}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-colors duration-200"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* --- Comments List Container --- */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-2 bg-slate-50/20 custom-scrollbar">
          {isLoading ? (
            <div className="py-10">
              <LoadingComments />
            </div>
          ) : comments && comments.length > 0 ? (
            <div>
              {comments.map((c) => (
                <Comment key={c._id} comment={c} post={post} />
              ))}
            </div>
          ) : (
            /* --- Clean Empty State (No Bounce) --- */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-white shadow-sm border border-slate-50 rounded-full flex items-center justify-center mb-5">
                <MessageCircle size={32} className="text-blue-500/30" />
              </div>
              <p className="text-sm text-slate-900 font-black uppercase tracking-widest">
                No Comments yet
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                Be the visionary who starts this conversation.
              </p>
            </div>
          )}
        </div>

        {/* --- Footer (Add Comment) --- */}
        <div className="p-4 bg-white border-t border-slate-50 shadow-sm">
          <div className="max-w-full overflow-hidden">
            <AddComment postId={post?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
