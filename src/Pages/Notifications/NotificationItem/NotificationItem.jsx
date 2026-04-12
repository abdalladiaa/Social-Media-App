import { Check, Heart, UserPlus, Share2, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { useMarkNotificationAsRead } from "../../../CustomHooks/useNotifications";

export default function NotificationItem({ notification, onMarkAsRead }) {
  const {
    actor,
    isRead,
    type,
    _id: notificationId,
    entityType,
    entityId,
    createdAt,
  } = notification;

  const { name, photo } = actor;

  const time = createdAt
    ? formatDistanceToNowStrict(new Date(createdAt))
        .replace(/ seconds?/, "s")
        .replace(/ minutes?/, "m")
        .replace(/ hours?/, "h")
        .replace(/ days?/, "d")
        .replace(/ months?/, "mo")
        .replace(/ years?/, "y")
    : "now";

  const config = {
    follow_user: {
      message: "started following you",
      icon: <UserPlus size={14} strokeWidth={2.5} />,
      color: "text-emerald-500",
    },
    comment_post: {
      message: "commented on your post",
      icon: <MessageCircle size={14} strokeWidth={2.5} />,
      color: "text-blue-600",
    },
    share_post: {
      message: "shared your post",
      icon: <Share2 size={14} strokeWidth={2.5} />,
      color: "text-purple-500",
    },
    like_post: {
      message: "liked your post",
      icon: <Heart size={14} strokeWidth={2.5} />,
      color: "text-pink-500",
    },
  };

  const currentConfig = config[type] || config.comment_post;
  const linkItem =
    entityType === "post" ? `/details/${entityId}` : `/profile/${entityId}`;

  // ==================================Mark Notification As Read========================
  const {
    mutate: markAsReadMutate,
    isPending: markAsReadIsPending,
  } = useMarkNotificationAsRead(notificationId);


  return (
    <div className="relative">
      <Link
        to={linkItem}
        className={`group flex gap-4 rounded-[20px] border p-4 transition-all duration-200 hover:shadow-sm ${
          isRead ? "border-gray-100" : "border-blue-100 bg-[#edf4ff]"
        }`}
      >
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <img
            alt={name}
            className="h-12 w-12 rounded-2xl object-cover"
            src={photo}
          />
          <span
            className={`absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 ${currentConfig.color}`}
          >
            {currentConfig.icon}
          </span>
        </div>

        {/* Content Section */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm leading-relaxed text-gray-800">
              <span className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                {name}
              </span>
              <span className="ml-1 text-gray-500 font-medium">
                {currentConfig.message}
              </span>
            </div>

            <span className="text-[10px] font-bold text-gray-400 px-2 py-0.5 rounded-lg shrink-0">
              {time}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex items-center gap-3">
            {isRead ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <Check size={13} strokeWidth={3} />
                <span>Read</span>
              </span>
            ) : (
              <button
                type="button"
                disabled={markAsReadIsPending}
                onClick={(e) => {
                  e.preventDefault();
                  markAsReadMutate(notificationId); 
                }}
                className={`z-10 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold transition-all 
        ${
          markAsReadIsPending
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-[#1877f2] ring-1 ring-[#dbeafe] hover:bg-[#e7f3ff] cursor-pointer"
        }`}
              >
                {markAsReadIsPending ? (
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                ) : (
                  <Check size={13} strokeWidth={3} />
                )}

                <span>
                  {markAsReadIsPending ? "Marking..." : "Mark as read"}
                </span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
