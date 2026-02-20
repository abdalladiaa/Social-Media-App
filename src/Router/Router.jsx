import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Profile from "../Pages/Profile/Profile";
import Register from "../Pages/AuthPage/Register/Register";
import Login from "../Pages/AuthPage/Login/Login";
import AuthPage from "../Pages/AuthPage/AuthPage";
import PostsGuard from "../Guards/PostsGuard";
import AuthGuard from "../Guards/AuthGuard";
import PostDetailes from "../Pages/PostDetailes/PostDetailes";
import Notifications from "../Pages/Notifications/Notifications";

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
            <Profile />
          </PostsGuard>
        ),
      },
      {
        path:"detailes/:postId",
        element: <PostsGuard><PostDetailes/></PostsGuard>
      },
      {
        path:"notifications",
        element: <PostsGuard><Notifications/></PostsGuard>
      }
    ],
  },
]);
