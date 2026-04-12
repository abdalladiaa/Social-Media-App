import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { headersObjData } from "../Helper/HeadersObj";

export default function useFriendsSuggestion(limit, search) {
  const queryKey = ["friendSuggest", limit, search];

  const getFriendsSuggestion = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=${limit}&page=${pageParam}${search ? `&q=${search}` : ""}`,
      headersObjData(),
    );
    return data;
  };

  const {
    data,
    isLoading,
    isFetching,
    isFetched,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: getFriendsSuggestion,
    getNextPageParam: (lastPage) => {
        const current = lastPage.meta.pagination.currentPage;
        const total = lastPage.meta.pagination.numberOfPages;
        return current < total ? current + 1 : undefined;

    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isFetched,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
