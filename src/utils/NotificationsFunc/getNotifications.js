import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export async function getNotifications() {
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/notifications?isRead=true",
      headersObjData(),
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
