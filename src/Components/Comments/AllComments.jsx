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

  const scrollRef = useRef(null);
  const handleBackdropWheel = (e) => {
    if (scrollRef.current && scrollRef.current.contains(e.target)) return;
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ top: e.deltaY, left: 0, behavior: "auto" });
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/40 p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      onWheel={handleBackdropWheel}
    >
      <div className="relative w-full max-w-xl bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col h-[92vh] sm:h-[85vh] sm:max-h-[800px] overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-300">
        {/* --- Header --- */}
        <div className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              Comments
              <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                {comments.length}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2.5 sm:p-2 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all active:scale-90"
          >
            <IoClose size={22} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* --- Comments List --- */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 sm:py-4 space-y-1 bg-slate-50/20 custom-scrollbar"
        >
          {isLoading ? (
            <div className="py-10 space-y-4">
              <LoadingComments />
              <LoadingComments />
              <LoadingComments />
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="pb-4">
              {comments.map((c) => (
                <Comment key={c._id} comment={c} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-sm border border-slate-50 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <MessageCircle
                  size={28}
                  className="text-blue-500/30 sm:w-8 sm:h-8"
                />
              </div>
              <p className="text-[11px] sm:text-sm text-slate-900 font-black uppercase tracking-[0.2em]">
                No Comments yet
              </p>
              <p className="text-xs text-slate-400 mt-2 max-w-[180px] sm:max-w-[220px] leading-relaxed">
                Be the visionary who starts this conversation.
              </p>
            </div>
          )}
        </div>

        {/* --- Footer (Add Comment) --- */}
        <div className="p-3 sm:p-5 bg-white border-t border-slate-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
          <div className="max-w-full relative">
            <AddComment postId={post?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
