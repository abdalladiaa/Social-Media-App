import React, { useEffect } from "react";
import PublicProfileDetailesCard from "../../Components/ProfileDetailesCard/PublicProfileDetailesCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useQuery } from "@tanstack/react-query";

export default function PublicProfile() {
  const { userId } = useParams();
  console.log(userId);
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

  const { data } = useQuery({
    queryFn: getUserProfile,
    queryKey: ["PublicProfileData"],
    enabled: Boolean(userId),
  });
  const userData = data?.data;


  return (
    <>
      <PublicProfileDetailesCard userData={userData} />
    </>
  );
}
