import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppNav from "./Components/AppNav/AppNav";
import { router } from "./Router/Router";
import AuthContextProvider from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <div><Toaster /></div>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
