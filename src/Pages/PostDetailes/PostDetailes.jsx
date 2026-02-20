import React, { useEffect } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import { useParams } from "react-router-dom";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import PostCard from "../../Components/PostCard/PostCard";

export default function PostDetailes() {
  const { postId } = useParams();
  const { data, isFetched, isLoading } = usePosts(
    ["detailes", postId],
    true,
    `posts/${postId}`,
  );

  console.log(data, "data");

  return (
    <>
      {isLoading && <LoadingCard />}
      {isFetched && <PostCard post={data.data.post} isDetailes={true} />}
    </>
  );
}
