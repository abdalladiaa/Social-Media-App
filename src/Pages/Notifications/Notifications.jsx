import React, { useEffect, useState } from "react";
import { FaCheckDouble, FaBell } from "react-icons/fa";
import NotificationItem from "./NotificationItem/NotificationItem";
import NotificationItemLoading from "./NotificationItemLoading/NotificationItemLoading";
import {
  useMarkAllNotificationAsRead,
  useNotifications,
} from "../../CustomHooks/useNotifications";
import { getNotifications } from "../../utils/NotificationsFunc/getNotifications";
import { BellOff } from "lucide-react";

export default function Notifications() {
  const { data, isLoading, isFetching, isFetched, isError } = useNotifications(
    getNotifications,
    ["notifications"],
  );

  const allNotifications = data?.data?.notifications;
  console.log(allNotifications);

  const unReadedNotifications = allNotifications?.filter(
    (notification) => notification?.isRead == false,
  );
  console.log(unReadedNotifications, "un read");

  const [filter, setFilter] = useState("all");
  const notificationsToShow =
    filter === "all" ? allNotifications : unReadedNotifications;

  // ==================================Mark All Notification As Read========================
  const { mutate: markAllAsReadMutate, isPending: markAllAsReadIsPending } =
    useMarkAllNotificationAsRead();

  return (
    <>
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 sm:p-6 mb-6 transition-all hover:shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <FaBell size={22} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl tracking-tight">
                Notifications
              </h2>
              <p className="mt-0.5 text-sm font-medium text-gray-500">
                Realtime updates for likes, comments, and follows.
              </p>
            </div>
          </div>

          <button
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            disabled={markAllAsReadIsPending || notificationsToShow?.length === 0}
            onClick={(e) => {
              e.preventDefault();
              markAllAsReadMutate();
            }}
          >
            {markAllAsReadIsPending ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            ) : (
              <FaCheckDouble className="text-blue-600" size={14} />
            )}

            <span>
              {markAllAsReadIsPending ? "Marking all..." : "Mark all as read"}
            </span>
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 p-1 bg-gray-50 w-fit rounded-2xl border border-gray-100">
          <button
            onClick={() => setFilter("all")}
            className={` cursor-pointer px-6 py-2 text-sm font-bold rounded-xl transition-all ${
              filter === "all"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={` cursor-pointer px-6 py-2 text-sm font-bold rounded-xl transition-all ${
              filter === "unread"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-100"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
            }`}
          >
            Unread
          </button>
        </div>
        <div className="space-y-2 py-3 sm:py-4">
          {isLoading && <NotificationItemLoading />}
          {isFetched &&
            (notificationsToShow?.length > 0 ? (
              notificationsToShow.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-slate-100 p-4">
                  <BellOff size={32} className="text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">
                  No notifications yet
                </h4>
                <p className="mt-1 text-xs text-slate-400">
                  We'll notify you when something important happens.
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
