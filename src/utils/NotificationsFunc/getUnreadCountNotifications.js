import axios from "axios";
import { headersObjData } from "../../Helper/HeadersObj";

export async function getUnreadCountNotifications() {
  try {
    const { data } = await axios.get(
      "https://route-posts.routemisr.com/notifications/unread-count",
      headersObjData(),
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
