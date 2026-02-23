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
  // التحقق من وجود تعليقات
  const hasComments = Array.isArray(comment) ? comment.length > 0 : !!comment;

  return (
    <div className="mx-2 mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/40 p-3 transition-all hover:bg-gray-50/80">
      {/* شارة التوب كومنت - تظهر فقط إذا لم نكن في صفحة التفاصيل */}
      {!isDetailes && hasComments && (
        <div className="flex items-center gap-1.5 mb-3">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Top Comment
          </p>
        </div>
      )}

      {/* عرض التعليق الفردي (في الـ Feed) */}
      {!isDetailes && comment && (
        <div className="group relative">
          <Comment comment={comment} post={post} />
        </div>
      )}

      {/* عرض قائمة التعليقات كاملة (في صفحة التفاصيل) */}
      {isDetailes && Array.isArray(comment) && (
        <div className="space-y-4 mb-4">
          {comment.map((item) => (
            <Comment key={item._id} comment={item} post={post} />
          ))}
          <div className="pt-2">
            <AddComment postId={post?.idF} />
          </div>
        </div>
      )}

      {/* زر عرض الكل - تم تحسينه بصرياً */}
      {!isDetailes && (
        <div className="mt-3 pt-2 border-t border-gray-200/50">
          {onOpenComments ? (
            <button
              onClick={() => onOpenComments(comment?.post)}
              className="flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
            >
              <HiOutlineChatBubbleLeftRight
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              View all conversation
            </button>
          ) : (
            <Link
              to={`/detailes/${comment?.post}`}
              className="flex items-center gap-2 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <HiOutlineChatBubbleLeftRight
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              View full discussion
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
