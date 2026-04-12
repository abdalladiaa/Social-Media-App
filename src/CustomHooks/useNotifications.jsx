import { useQuery } from "@tanstack/react-query";
import { useGenericMutation } from "./useGenericMutation";
import axios from "axios";
import { headersObjData } from "../Helper/HeadersObj";
export function useNotifications(fn, key) {
  return useQuery({
    queryFn: fn,
    queryKey: key,
  });
}

export function useMarkNotificationAsRead(notificationId) {
  async function MarkNotificationAsRead() {
    const { data } = await axios.patch(
      `https://route-posts.routemisr.com/notifications/${notificationId}/read`,
      {},
      headersObjData(),
    );
    return data;
  }
  return useGenericMutation(MarkNotificationAsRead, ["notifications"]);
}

export function useMarkAllNotificationAsRead() {
  async function MarkAllNotificationAsRead() {
    const { data } = await axios.patch(
      `https://route-posts.routemisr.com/notifications/read-all`,
      {},
      headersObjData(),
    );
    return data;
  }
  return useGenericMutation(MarkAllNotificationAsRead, ["notifications"]);
}
