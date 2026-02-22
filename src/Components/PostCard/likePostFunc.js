import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export async function likePostFunc(postId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/like`,
      {},
      headersObjData(),
    );
    return data;
  } catch (err) {
    console.log(err, "Like Post func");
    throw err;
  }
}
