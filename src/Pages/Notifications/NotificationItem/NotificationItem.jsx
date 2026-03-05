import React from "react";
import { FaCheck } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NotificationItem({notification}) {
    console.log(notification);
    const {actor , isRead , type , _id:notificationId} = notification
    const { name , photo , _id:actorId } = actor 
    
  return (
    <article className="group relative flex gap-4 rounded-[20px] border border-gray-100 p-4 transition-all duration-300 bg-white hover:bg-blue-50/30 hover:shadow-sm hover:border-blue-100">

      <div className="relative shrink-0">
        <Link
          to="/profile"
          className="block transition-transform active:scale-90"
        >
          <img
            alt={name}
            className="h-12 w-12 rounded-2xl object-cover ring-2 ring-gray-50 group-hover:ring-white transition-all"
            src={photo}
          />
        </Link>
        <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white shadow-sm">
          <FiMessageCircle size={12} />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm leading-relaxed text-gray-800">
            <Link
              to="/profile"
              className="font-black text-gray-900 hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              {name}
            </Link>
            <span className="ml-1 text-gray-500 font-medium">
              commented on your post
            </span>
          </div>

          <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg shrink-0">
            4d
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 font-medium line-clamp-2">
          "Test"
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/50">
            <FaCheck size={10} strokeWidth={4} />
            <span>Read</span>
          </div>
          <button className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors">
            View Post
          </button>
        </div>
      </div>
    </article>
  );
}
