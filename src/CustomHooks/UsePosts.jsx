import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headersObjData } from "../Helper/HeadersObj";


export default function usePosts(queryKey, isEnabled, endPoint) {
  async function getPosts() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/${endPoint}`,
        headersObjData(),
      );
      console.log(data);

      return data;
    } catch (err) {
      console.log(err, "From get posts hook");
    }
  }
  const { data, isLoading, isFetching, isFetched, isError } = useQuery({
    queryFn: getPosts,
    queryKey: [...queryKey],
    enabled: isEnabled,
  });
  return { data, isLoading, isFetching, isFetched, isError };
}