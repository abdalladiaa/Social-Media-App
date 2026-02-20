import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingComments() {
  return (
    <div className="mx-2 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
      {/* Top Comment title */}
      <Skeleton width={90} height={12} />

      <div className="flex items-start gap-2 mt-3">
        {/* Avatar */}
        <Skeleton circle width={32} height={32} />

        <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
          {/* Name */}
          <Skeleton width={120} height={12} />

          {/* Content */}
          <div className="mt-2">
            <Skeleton height={10} />
            <Skeleton height={10} width="80%" />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Skeleton width={130} height={12} />
      </div>
    </div>
  );
}
