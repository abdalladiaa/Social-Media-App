import React, { useState } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import PostCard from "../../Components/PostCard/PostCard";
import AddPost from "../../Components/AddPost/AddPost";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import { HiOutlineArrowDown } from "react-icons/hi2";

export default function Posts() {
  const [postsPagination, setPostsPagination] = useState(10);

  const { data, isLoading, isFetching, isFetched } = usePosts(
    ["allPosts", postsPagination],
    true,
    `posts?limit=${postsPagination}`,
  );

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* منطقة كتابة المنشور */}
      <section className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <AddPost />
      </section>

      {/* قائمة المنشورات */}
      <div className="space-y-6">
        {/* حالة التحميل الأولية */}
        {isLoading && (
          <div className="space-y-6">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        )}

        {/* عرض المنشورات بعد الجلب */}
        {isFetched &&
          data?.data?.posts?.map((post, index) => (
            <div
              key={post._id}
              className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out"
              style={{ animationDelay: `${index * 50}ms` }} // تأثير ظهور تتابعي ناعم
            >
              <PostCard post={post} />
            </div>
          ))}
      </div>

      {/* زر تحميل المزيد - مظهر بريميوم */}
      {isFetched && data?.data?.posts?.length >= postsPagination && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            disabled={isFetching}
            onClick={() => setPostsPagination((prev) => prev + 10)}
            className="group relative flex items-center gap-3 px-10 py-4 bg-white border border-gray-200 text-gray-700 font-black rounded-2xl hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm active:scale-95 disabled:opacity-70 disabled:cursor-wait"
          >
            {isFetching ? (
              <>
                <div className="w-5 h-5 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <span>Loading more...</span>
              </>
            ) : (
              <>
                <HiOutlineArrowDown className="group-hover:animate-bounce" />
                <span>Explore More Posts</span>
              </>
            )}
          </button>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            Showing {data?.data?.posts?.length} posts
          </p>
        </div>
      )}
    </div>
  );
}
