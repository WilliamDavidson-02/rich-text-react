import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useWindowWidth } from "./hooks/useWindowSize";

const Auth = lazy(() => import("./pages/Auth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
]);

export default function App() {
  const isMobile = useWindowWidth() < 1024;

  return (
    <>
      <Toaster
        closeButton={true}
        theme="system"
        richColors={true}
        offset={24}
        position={isMobile ? "top-center" : "bottom-right"}
      />
      <RouterProvider router={router} />
    </>
  );
}
