import React, { useContext } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../../Components/PostCard/PostCard";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import AddPost from "../../Components/AddPost/AddPost";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["userPosts"],
    Boolean(userData?._id),
    `users/${userData?._id}/posts?limit=10`,
  );

  return (
    <>
      <AddPost />
      {(isLoading || Boolean(userData?._id) == false) && <LoadingCard />}
      {isFetched &&
        data.data.posts.map((post) => <PostCard key={post._id} post={post} />)}
    </>
  );
}
