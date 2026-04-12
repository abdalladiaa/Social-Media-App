
import PublicProfileDetailsCard from "../../Components/ProfileDetailsCard/PublicProfileDetailsCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usePosts from "../../CustomHooks/UsePosts";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import PostCard from "../../Components/PostCard/PostCard";
import NoPosts from "../../Components/NoPosts/NoPosts";
import { getUserProfileById } from "../../utils/getUserDataById/getUserProfileById";

export default function PublicProfile() {
  const { userId } = useParams();



  const { data: profileResponse } = useQuery({
    queryFn:() => getUserProfileById(userId),
    queryKey: ["PublicProfileData", userId],
    enabled: Boolean(userId),
  });
  const userData = profileResponse?.data;

  const {
    data: postsData,
    isLoading,
  } = usePosts(["PublicProfilePosts", userId], true, `users/${userId}/posts`);

  const posts = postsData?.data?.posts || [];

  return (
    <>
      <PublicProfileDetailsCard userData={userData} />

      {isLoading || !userData?.user?._id ? (
        <LoadingCard />
      ) : posts.length > 0 ? (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      ) : (
        <NoPosts />
      )}
    </>
  );
}


