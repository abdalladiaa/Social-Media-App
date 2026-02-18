import React from "react";

export default function CommenCard({ comment }) {
  return (
    <>
      <div className="mx-2 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 ">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 ">
          Top Comment
        </p>
        <div className="flex items-start gap-2">
          <img
            alt={comment.commentCreator.name}
            className="h-8 w-8 rounded-full object-cover"
            src={comment.commentCreator.photo}
          />
          <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
            <p className="truncate text-xs font-bold text-slate-900">
              {comment.commentCreator.name}
            </p>
            <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700 overflow-hidden">
                {comment.content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
