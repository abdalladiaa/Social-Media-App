import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export function sharepostFunc(postId , formData) {
  try {
    const { data } = axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/share`,
      formData,
      headersObjData(),
    );
    return data
  } catch (err) {
    console.log(err);
  }
}
