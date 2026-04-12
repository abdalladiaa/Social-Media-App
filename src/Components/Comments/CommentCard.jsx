import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import LoadingComments from "./LoadingComments";
import { MessageCircle, MessageSquarePlus } from "lucide-react";

export default function CommentCard({
  commentsIsLoading,
  comment = [],
  isDetails = false,
  post,
  onOpenComments,
}) {
  const comments = Array.isArray(comment) ? comment : [comment];
  const hasComments = comments.length > 0;
  const postId = post?._id;

  if (commentsIsLoading) {
    return (
      <div className="bg-slate-50 p-4 rounded-2xl">
        <LoadingComments />
      </div>
    );
  }

  return (
    <>
      <div>
        <div
          className={`p-4 bg-slate-50 ${
            !isDetails &&
            "mx-4 mb-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md"
          }`}
        >
          {/* Feed Preview */}
          {!isDetails && (
            <>
              {hasComments && (
                <>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Top Comment
                  </p>
                  <Comment comment={comments[0]} post={post} />
                </>
              )}

              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <button
                  onClick={() => onOpenComments?.(postId)}
                  className="flex items-center gap-2 text-[12px] font-bold text-[#1877f2] hover:underline cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>View all comments</span>
                </button>
              </div>
            </>
          )}

          {/* Details View */}
          {isDetails && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-sm font-black text-slate-800 uppercase">
                  All Comments
                </h3>
                {hasComments && (
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full">
                    {comments.length}
                  </span>
                )}
              </div>

              {hasComments ? (
                <div className="space-y-5">
                  {comments.map((c) => (
                    <Comment key={c._id} comment={c} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <MessageSquarePlus
                    size={32}
                    className="text-slate-300 mb-3"
                  />
                  <h4 className="text-sm font-bold text-slate-700">
                    No comments yet
                  </h4>
                  <p className="text-[12px] text-slate-400 mt-1">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="  sticky bottom-0 right-0 left-0 z-10 bg-transparent">
          <AddComment postId={postId} />
        </div>
      </div>
    </>
  );
}
