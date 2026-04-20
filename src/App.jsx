import { RouterProvider } from "react-router-dom";
import "./App.css";
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
          <Toaster 
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                padding: '16px 24px',
                color: '#1e293b',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
                style: {
                  borderLeft: '4px solid #10b981',
                }
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  borderLeft: '4px solid #ef4444',
                }
              },
            }}
          />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
