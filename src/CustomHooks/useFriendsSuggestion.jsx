import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { headersObjData } from "../Helper/HeadersObj";

export default function useFriendsSuggestion(
  limit,
  queryKey = ["friendSuggest"],
) {
  const getFriendsSuggestion = async () => {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=${limit}`,
      headersObjData(),
    );
    return data;
  };

  const { data, isLoading, isFetching, isFetched, isError } = useQuery({
    queryKey,
    queryFn: getFriendsSuggestion,
  });

  return { data, isLoading, isFetching, isFetched, isError };
}
