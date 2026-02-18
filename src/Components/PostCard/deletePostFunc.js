import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";
import { useGenericMutation } from "../../CustomHooks/useGenericMutation";

export async function deletePostFunc(postId) {
  try {
    const response = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}`,
      headersObjData(),
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err, "DeletePost func");
  }
}

