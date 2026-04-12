
import PublicProfileDetailsCard from "../../Components/ProfileDetailsCard/PublicProfileDetailsCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useQuery } from "@tanstack/react-query";
import usePosts from "../../CustomHooks/UsePosts";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import PostCard from "../../Components/PostCard/PostCard";
import NoPosts from "../../Components/NoPosts/NoPosts";

export default function PublicProfile() {
  const { userId } = useParams();

  async function getUserProfile() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${userId}/profile`,
        headersObjData(),
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const { data: profileResponse } = useQuery({
    queryFn: getUserProfile,
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


