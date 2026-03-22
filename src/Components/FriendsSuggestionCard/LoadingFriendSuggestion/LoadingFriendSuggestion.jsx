import React from "react";

export default function LoadingFriendSuggestionِ() {
  return (
    <div className="rounded-[20px] border border-gray-50 bg-white p-3 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* الصورة - Skeleton */}
          <div className="relative">
            <div className="h-11 w-11 rounded-2xl bg-slate-200"></div>
            {/* النقطة الخضراء - Skeleton */}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-slate-100 border-2 border-white rounded-full"></div>
          </div>

          <div className="min-w-0 space-y-2">
            {/* الاسم - Skeleton */}
            <div className="h-3 w-24 rounded-full bg-slate-200"></div>
            {/* اليوزر نيم - Skeleton */}
            <div className="h-2 w-16 rounded-full bg-slate-100"></div>
          </div>
        </div>

        {/* زرار الإضافة - Skeleton */}
        <div className="h-9 w-9 rounded-xl bg-slate-100"></div>
      </div>

      {/* الإحصائيات (Followers) - Skeleton */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-5 w-20 rounded-lg bg-slate-100"></div>
        <div className="h-5 w-16 rounded-lg bg-slate-50"></div>
      </div>
    </div>
  );
}