import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { headersObjData } from "../Helper/HeadersObj";
import { useEffect, useRef } from "react";

export default function usePosts( queryKey, isEnabled, endPoint, options = {} ,) {
  const { isInfinite = false, limit = 10 } = options;
  const loadMoreRef = useRef(null);

  if (!isInfinite) {
    async function getPosts() {
      try {
        const { data } = await axios.get(
          `https://route-posts.routemisr.com/${endPoint}`,
          headersObjData(),
        );

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

  //! Infinite page-based query (page starts at 1)

  const fetchPosts = async ({ pageParam = 1 }) => {
    try {
      const sep = endPoint.includes("?") ? "&" : "?";
      const url = `https://route-posts.routemisr.com/${endPoint}${sep}limit=${limit}&page=${pageParam}`;
      const res = await axios.get(url, headersObjData());
      return res.data;
    } catch (err) {
      console.log(err, "From infinite posts hook");
    }
  };

  const infiniteResult = useInfiniteQuery({
    queryKey: [...queryKey],
    queryFn: fetchPosts,
    enabled: isEnabled,
    getNextPageParam: (lastPage) => {
      return lastPage?.meta?.pagination?.nextPage ?? undefined;
    },
  });

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        infiniteResult.hasNextPage &&
        !infiniteResult.isFetchingNextPage
      ) {
        infiniteResult.fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      observer.disconnect();
    };
  }, [infiniteResult.fetchNextPage, infiniteResult.hasNextPage, infiniteResult.isFetchingNextPage]);

  return { ...infiniteResult, loadMoreRef };
}
