import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headersObjData } from "../Helper/HeadersObj";
import { useGenericMutation } from "./useGenericMutation";

//! GET comments
export default function usePostComments(postId, isEnabled = true) {
  async function getPostComments() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${postId}/comments`,
        headersObjData(),
      );
      return data;
    } catch (err) {
      console.log(err, "From get comments hook");
      throw err;
    }
  }

  const { data, isLoading, isFetching, isFetched, isError } = useQuery({
    queryFn: getPostComments,
    queryKey: ["comments", postId],
    enabled: isEnabled && !!postId,
  });

  return { data, isLoading, isFetching, isFetched, isError };
}

//! POST comment
export function useAddComment(postId , formData) {


  return useGenericMutation(
    addComment,
    ["comments", postId],
    "Comment added successfully",
    "Failed to add comment",
  );
}

//! DELETE comment
export function useDeleteComment() {
  async function deleteComment(commentId) {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/comments/${commentId}`,
      headersObjData(),
    );
    return data;
  }

  return useGenericMutation(
    deleteComment,
    ["comments"],
    "Comment deleted successfully",
    "Failed to delete comment",
  );
}
