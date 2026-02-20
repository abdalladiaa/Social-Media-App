import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingCard() {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-4 sm:p-5 mb-4 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Skeleton circle width={40} height={40} />

          <div className="space-y-1">
            <Skeleton width={120} height={14} />
            <Skeleton width={80} height={10} />
          </div>
        </div>

        {/* Three dots */}
        <Skeleton circle width={28} height={28} />
      </div>

      {/* Post text */}
      <div className="space-y-2 mb-3">
        <Skeleton width="100%" height={12} />
        <Skeleton width="90%" height={12} />
        <Skeleton width="60%" height={12} />
      </div>

      {/* Post image */}
      <div className="rounded-xl overflow-hidden mb-3">
        <Skeleton height={220} />
      </div>

      {/* Engagement stats */}
      <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 mt-2">
        <Skeleton width={70} height={10} />
        <div className="flex gap-x-5">
          <Skeleton width={80} height={10} />
          <Skeleton width={70} height={10} />
          <Skeleton width={60} height={10} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-around mt-3 gap-2">
        <Skeleton height={36} width="100%" borderRadius={8} />
        <Skeleton height={36} width="100%" borderRadius={8} />
        <Skeleton height={36} width="100%" borderRadius={8} />
      </div>
    </article>
  );
}
