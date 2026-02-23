import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Comment from "./Comment";
import LoadingComments from "./LoadingComments";
import AddComment from "./AddComment";
import { FaComment } from "react-icons/fa";

export default function AllComments({
  comments = [],
  onClose,
  isLoading = false,
  post,
}) {
  // قفل التمرير في الخلفية
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header - ثابت */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-black text-gray-900 leading-none">
              Comments
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {comments.length} people shared their thoughts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all duration-200"
            aria-label="close"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* قائمة التعليقات - قابلة للتمرير */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-gray-50/30">
          {isLoading ? (
            <LoadingComments />
          ) : comments && comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((c) => (
                <Comment key={c._id} comment={c} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaComment />
              </div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">
                No comments yet
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Be the first to start the conversation!
              </p>
            </div>
          )}
        </div>

        {/* Footer: إضافة تعليق - ثابت في الأسفل */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <AddComment postId={post?._id} />
        </div>
      </div>
    </div>
  );
}
