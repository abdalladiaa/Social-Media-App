import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function CommentCard({
  comment,
  isDetailes = false,
  post,
  onOpenComments,
}) {

  const hasComments = Array.isArray(comment) ? comment.length > 0 : !!comment;


  const postIdForAdd = post?._id || post?.id || comment?.post;

  return (
    <div className="mx-2 mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/40 p-3 transition-all hover:bg-gray-50/80">

      {!isDetailes && hasComments && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Top Comment
          </p>
        </div>
      )}


      {!isDetailes && comment && (
        <div className="group relative">
          <Comment comment={comment} post={post} />
        </div>
      )}


      {isDetailes && (
        <div className="space-y-4">
          { comment.length > 0 ? (
            comment.map((comment) => (
              <Comment key={comment._id} comment={comment} post={post} />
            ))
          ) : (
            <p className="text-center py-4 text-xs text-gray-400 font-medium">
              No comments yet. Start the conversation!
            </p>
          )}

          <div className="pt-3 border-t border-gray-100">
            <AddComment postId={postIdForAdd} />
          </div>
        </div>
      )}


      {!isDetailes && (
        <div className="mt-3 pt-2 border-t border-gray-200/50">
          {onOpenComments ? (
            <button
              onClick={() => onOpenComments(comment?.post)}
              className="flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-all group cursor-pointer w-full text-left"
            >
              <div className="p-1 rounded-lg group-hover:bg-blue-50 transition-colors">
                <HiOutlineChatBubbleLeftRight
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              View all conversation
            </button>
          ) : (
            <Link
              to={`/detailes/${comment?.post}`}
              className="flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-all group"
            >
              <div className="p-1 rounded-lg group-hover:bg-blue-50 transition-colors">
                <HiOutlineChatBubbleLeftRight
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              View full discussion
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
