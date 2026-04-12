import React, { useEffect } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import { useParams } from "react-router-dom";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import PostCard from "../../Components/PostCard/PostCard";
import NoPosts from "../../Components/NoPosts/NoPosts";
import PostNotFound from "../../Components/PostCard/PostNotFound/PostNotFound";

export default function PostDetails() {
  const { postId } = useParams();
  const { data, isFetched, isLoading, isError } = usePosts(
    ["details", postId],
    true,
    `posts/${postId}`,
  );

  if (isLoading) return <LoadingCard />;

  if (isError || !data?.data?.post) {
    return <PostNotFound/>;
  }

  return <PostCard post={data.data.post} isDetails={true} />;
}
