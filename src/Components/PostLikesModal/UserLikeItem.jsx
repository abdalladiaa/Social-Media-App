import React from "react";
import { Link } from "react-router-dom";
import { getUserProfileById } from "../../utils/getUserDataById/getUserProfileById";
import { useQuery } from "@tanstack/react-query";

export default function UserLikeItem({ userId, onClose }) {
  const { data: userResponse, isLoading } = useQuery({
    queryKey: ["users", userId, "profile"],
    queryFn: () => getUserProfileById(userId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 px-3 py-2 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="h-2 w-16 rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!userResponse?.data?.user) return null;

  const { name, photo, username, _id } = userResponse.data.user;

  return (
    <Link
      to={`/profile/${_id}`}
      onClick={onClose}
      className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100 group"
    >
      <img
        className="h-10 w-10 rounded-full border border-slate-100 object-cover transition-transform group-hover:scale-105"
        src={
          photo ||
          "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
        }
        alt={name}
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-bold capitalize text-slate-900 group-hover:text-[#1877f2] transition-colors">
          {name}
        </p>
        <p className="truncate text-xs text-slate-500 font-medium">
          @{username}
        </p>
      </div>
    </Link>
  );
}
