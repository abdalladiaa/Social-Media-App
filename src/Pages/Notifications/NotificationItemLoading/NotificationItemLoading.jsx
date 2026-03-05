import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NotificationItemLoading() {
  return (
    <div className="flex gap-4 rounded-[20px] border border-gray-100 p-4 bg-white shadow-sm">
      {/* Avatar Skeleton */}
      <div className="shrink-0">
        <Skeleton
          width={48}
          height={48}
          borderRadius={16}
          baseColor="#f3f4f6"
          highlightColor="#ffffff"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="w-full">
            {/* Name & Action Line */}
            <Skeleton width="55%" height={14} borderRadius={4} />

            {/* Content Preview Line */}
            <div className="mt-2">
              <Skeleton width="85%" height={12} borderRadius={4} />
            </div>
          </div>

          {/* Time Badge Skeleton */}
          <Skeleton width={35} height={16} borderRadius={6} />
        </div>

        {/* Bottom Badges Section */}
        <div className="mt-4 flex gap-3">
          {/* Status Pill */}
          <Skeleton width={50} height={22} borderRadius={20} />
          {/* Action Button */}
          <Skeleton width={70} height={22} borderRadius={20} />
        </div>
      </div>
    </div>
  );
}
