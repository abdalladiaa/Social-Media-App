import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export async function SavePostFunc(postId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/bookmark`,
      {},
      headersObjData(),
    );
    return data;
  } catch (err) {
    console.log(err, "Save Post func");
    throw err;
  }
}
