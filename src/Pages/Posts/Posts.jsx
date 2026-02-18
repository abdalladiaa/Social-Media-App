import React from "react";
import usePosts from "../../CustomHooks/UsePosts";
import PostCard from "../../Components/PostCard/PostCard";
import AddPost from "../../Components/AddPost/AddPost";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";

export default function Posts() {
  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["allPosts"],
    true,
    "posts",
  );
  return (
    <>
      <AddPost />
      {isLoading && <LoadingCard />}
      {isFetched &&
        data.data.posts.map((post) => <PostCard key={post._id} post={post} />)}
    </>
  );
}
