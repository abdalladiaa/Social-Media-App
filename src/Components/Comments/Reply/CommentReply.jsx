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
    <div className="relative mt-2 ml-4 pl-4 w-[50%]">
      {(replies.length > 0 || isFetched) && (
        <span className="absolute left-0 top-0 bottom-10 w-[1.5px] rounded-full bg-slate-200" />
      )}

      {isLoading && (
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span className="text-[10px] font-semibold text-slate-400">
            Loading...
          </span>
        </div>
      )}

      <div className="space-y-3">
        {isFetched &&
          (replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply._id} className="relative">
                <span className="absolute -left-4 top-4 h-[1.5px] w-4 bg-slate-200" />
                <Comment post={post} comment={reply} isReply />
              </div>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 ml-2 italic">
              No replies yet
            </p>
          ))}

        <div className="relative mt-2">
          <span className="absolute -left-4 top-5 h-[1.5px] w-4 bg-slate-200" />
          <AddReply postId={postId} commentId={commentId} />
        </div>
      </div>
    </div>
  );
}
