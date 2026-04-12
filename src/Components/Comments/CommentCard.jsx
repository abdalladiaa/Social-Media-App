import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import AddComment from "./AddComment";
import {
  MessageSquareText,
  MessageCircle,
  MessageSquarePlus,
} from "lucide-react";

export default function CommentCard({
  comment,
  isDetails = false,
  post,
  onOpenComments,
}) {
  const hasComments = Array.isArray(comment) ? comment.length > 0 : !!comment;
  const postIdForAdd =
    post?._id ||
    post?.id ||
    (Array.isArray(comment) ? comment[0]?.post : comment?.post);

  return (
    <div
      className={`bg-slate-50 ${isDetails ? "bg-transparent" : "mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm hover:shadow-md"}`}
    >
      {/* 1. Feed View Header (Top Comment Label) */}
      {!isDetails && hasComments && (
        <div className="flex items-center gap-2 mb-3 px-0.5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Top Comment
          </p>
        </div>
      )}

      {/* 2. Single Comment Preview (Feed View) */}
      {!isDetails && comment && !Array.isArray(comment) && (
        <div className="group relative">
          <Comment comment={comment} post={post} />
        </div>
      )}

      {/* 3. Detailed View (Comments List) */}
      {isDetails && (
        <div className="mt-2 flex flex-col">
          {/* Header for Details View */}
          <div className="flex items-center gap-2 mb-6 px-1">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
              All Comments
            </h3>
            {Array.isArray(comment) && comment.length > 0 && (
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-blue-100">
                {comment.length}
              </span>
            )}
          </div>

          {Array.isArray(comment) && comment.length > 0 ? (
            <div className="space-y-5">
              {comment.map((c) => (
                <div key={c._id}>
                  <Comment comment={c} post={post} />
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced Empty State - Cleaned */
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="bg-white p-4 rounded-2xl mb-4 shadow-sm">
                <MessageSquarePlus size={32} className="text-slate-300" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">
                No comments yet
              </h4>
              <p className="text-[12px] text-slate-400 mt-1 max-w-[180px]">
                Be the first to share your thoughts!
              </p>
            </div>
          )}

          {/* Add Comment Section - Sticky but no blur transitions */}
          <div className="mt-8 pt-4 sticky bottom-0 z-20 bg-white pb-2">
            <AddComment postId={postIdForAdd} />
          </div>
        </div>
      )}

      {/* 4. Action Footer (Feed View Only) */}
      {!isDetails && (
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-between items-center">
          <button
            onClick={() => onOpenComments && onOpenComments(postIdForAdd)}
            className="flex items-center gap-2 text-[12px] font-bold text-[#1877f2] hover:underline cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>View all comments</span>
          </button>
        </div>
      )}
    </div>
  );
}
