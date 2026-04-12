import React, { useState } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import PostCard from "../../Components/PostCard/PostCard";
import AddPost from "../../Components/AddPost/AddPost";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import SidebarNav from "../../Components/SidebarNav/SidebarNav";
import FriendsSuggestionCard from "../../Components/FriendsSuggestionCard/FriendsSuggestionCard";
import NoPosts from "../../Components/NoPosts/NoPosts";

export default function Posts() {
  const [activeFilter, setActiveFilter] = useState("following");

  const { data, isLoading, isFetched, loadMoreRef, isFetchingNextPage } =
    usePosts(
      ["allPosts", activeFilter],
      true,
      activeFilter === "saved"
        ? "users/bookmarks"
        : `posts/feed?only=${activeFilter}`,
      {
        isInfinite: true,
        limit: 10,
      },
    );

  const getItems = (page) => page?.data?.posts || page?.data?.bookmarks;

  const allPosts = data?.pages?.flatMap(getItems)?.filter(Boolean);

  return (
    <main className="min-w-0 w-full">
      <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
        <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
          <SidebarNav
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        </aside>

        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
            <SidebarNav
              setActiveFilter={setActiveFilter}
              activeFilter={activeFilter}
            />
          </div>
          <div className="space-y-3 xl:hidden">
            <FriendsSuggestionCard />
          </div>
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <AddPost />
          </div>

          <div>
            {isLoading && (
              <div className="space-y-6">
                <LoadingCard />
                <LoadingCard />
              </div>
            )}

            {allPosts?.length
              ? allPosts.map((post) => <PostCard key={post._id} post={post} />)
              : isFetched && <NoPosts />}

            <div ref={loadMoreRef} className="h-10"></div>
            {isFetchingNextPage && <LoadingCard />}
          </div>
        </section>

        <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
          <FriendsSuggestionCard />
        </aside>
      </div>
    </main>
  );
}
