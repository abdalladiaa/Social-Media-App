import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

 export async function getUserProfileById(userId) {
  try {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/${userId}/profile`,
      headersObjData(),
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
