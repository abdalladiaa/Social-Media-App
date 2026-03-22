import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export async function addFollow(userId) {
  try {
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/users/${userId}/follow`,
      {},
      headersObjData(),
    );
    return data;
  } catch (err) {
    throw err;
  }
}
