import React, { useContext } from "react";
import usePosts from "../../CustomHooks/UsePosts";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../../Components/PostCard/PostCard";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import AddPost from "../../Components/AddPost/AddPost";
import MyProfileDetailsCard from "../../Components/ProfileDetailsCard/MyProfileDetailsCard";
import NoPosts from "../../Components/NoPosts/NoPosts";

export default function MyProfile() {
  const { userData } = useContext(AuthContext);
  const { data, isLoading, isFetching, isFetched, isError } = usePosts(
    ["userPosts"],
    Boolean(userData?._id),
    `users/${userData?._id}/posts?limit=10`,
  );

  const posts = data?.data.posts;

  return (
    <>
      <MyProfileDetailsCard userData={userData} posts={posts} />
      <AddPost />

      {isLoading || !userData?._id ? (
        <LoadingCard />
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <NoPosts />
      )}
    </>
  );
}
