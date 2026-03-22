import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import AuthPage from "../Pages/AuthPage/AuthPage";
import PostsGuard from "../Guards/PostsGuard";
import AuthGuard from "../Guards/AuthGuard";
import PostDetailes from "../Pages/PostDetailes/PostDetailes";
import Notifications from "../Pages/Notifications/Notifications";
import Settings from "../Pages/Settings/Settings";
import MyProfile from "../Pages/MyProfile/MyProfile";
import PublicProfile from "../Pages/PublicProfile/PublicProfile";
import SuggestedFriends from "../Pages/SuggestedFriends/SuggestedFriends";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PostsGuard>
            <Posts />
          </PostsGuard>
        ),
      },
      {
        path: "auth",
        element: (
          <AuthGuard>
            <AuthPage />
          </AuthGuard>
        ),
      },
      {
        path: "profile",
        element: (
          <PostsGuard>
            <MyProfile />
          </PostsGuard>
        ),
      },
      {
        path:"profile/:userId",
        element:<PostsGuard><PublicProfile/></PostsGuard>
      },
      {
        path: "detailes/:postId",
        element: (
          <PostsGuard>
            <PostDetailes />
          </PostsGuard>
        ),
      },
      {
        path: "notifications",
        element: (
          <PostsGuard>
            <Notifications />
          </PostsGuard>
        ),
      },
      {
        path: "settings",
        element: (
          <PostsGuard>
            <Settings />
          </PostsGuard>
        ),
      },
      {
        path: "suggestions",
        element: (
          <PostsGuard>
            <SuggestedFriends />
          </PostsGuard>
        ),
      },
    ],
  },
]);
