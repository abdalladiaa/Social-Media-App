import axios from "axios";
import { useInfiniteQuery} from "@tanstack/react-query";
import { headersObjData } from "../Helper/HeadersObj";


export default function useCommentReplies(limit, postId , commentId) {
  const queryKey = ["commentReplies", commentId , postId];

  const getCommentReplies = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=${pageParam}&limit=${limit}`,
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
    queryFn: getCommentReplies,
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
