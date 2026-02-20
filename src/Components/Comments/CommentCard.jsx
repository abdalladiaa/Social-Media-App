import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import AddComment from "./AddComment";

export default function CommentCard({ comment, isDetailes = false, post }) {
  console.log(comment, "comment");

  return (
    <>
      <div className=" mx-2 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 ">
        {!!comment.length && (
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 ">
            Top Comment
          </p>
        )}
        {!isDetailes && <Comment comment={comment} post={post} />}
        {isDetailes &&
          comment.map((comment) => <Comment key={comment._id} comment={comment} post={post} />)}
        {isDetailes && <AddComment />}
        {!isDetailes && (
          <Link
            to={`/detailes/${comment.post}`}
            className=" cursor-pointer mt-2 text-xs font-bold text-[#1877f2] hover:underline"
          >
            view all comments
          </Link>
        )}
      </div>
    </>
  );
}
