import React, { useEffect } from "react";
import { X, Users } from "lucide-react";
import { Link } from "react-router-dom";
import UserLikeItem from "./UserLikeItem";

export default function PostLikesModal({ likes, setShowLikesModal }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  console.log(likes);

  return (
    <div className="fixed inset-0 z-[71] flex items-center justify-center bg-slate-900/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[520px] rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <Users size={17} className="text-[#1877f2]" />
            <h4 className="text-base font-extrabold text-slate-900">
              People who reacted
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowLikesModal(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        {/* Users List Container */}
        <div className="max-h-[420px] overflow-y-auto px-2 py-2 custom-scrollbar">
          <div className="space-y-1">
            {likes && likes.length > 0 ? (
              likes.map((userId) => (
                <UserLikeItem
                  userId={userId}
                  key={userId}
                  onClose={() => setShowLikesModal(false)}
                />
              ))
            ) : (
              <div className="py-8 text-center text-sm font-medium text-slate-500">
                No reactions yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
