import React from "react";
import useCommentReplies from "../../../CustomHooks/useCommentReplies";
import Comment from "../Comment";
import AddReply from "./AddReply";

export default function CommentReply({ post, comment }) {
  const { _id: postId } = post;
  const { _id: commentId } = comment;

  const { data, isLoading, isFetched } = useCommentReplies(
    10,
    postId,
    commentId,
  );

  const replies = data?.pages?.flatMap((page) => page.data?.replies) || [];

  return (
    <div className="relative mt-2 ml-5 pl-4">
      {/* الخط الجانبي الواصل للردود */}
      {(replies.length > 0 || isFetched) && (
        <span className="absolute bottom-10 left-0 top-1 w-px rounded-full bg-slate-300" />
      )}

      {isLoading && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span className="text-[10px] font-semibold text-slate-400">
            Loading...
          </span>
        </div>
      )}

      <div className="space-y-4">
        {isFetched &&
          (replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply._id} className="relative">
                {/* خط أفقي صغير لكل رد */}
                <span className="absolute -left-4 top-4 h-px w-4 bg-slate-300" />
                <Comment post={post} comment={reply} isReply />
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic ml-2">No replies yet.</p>
          ))}

        <div className="mt-2">
          <AddReply
            postId={postId}
            commentId={commentId}
            targetName={comment.commentCreator?.name}
          />
        </div>
      </div>
    </div>
  );
}
