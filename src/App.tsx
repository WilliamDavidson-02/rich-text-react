import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useWindowWidth } from "./hooks/useWindowSize";
import UserContextProvider from "./context/UserContext";
import Loading from "./components/Loading";

const Auth = lazy(() => import("./pages/Auth"));
const DocsBoard = lazy(() => import("./pages/DocsBoard"));
const Document = lazy(() => import("./pages/Document"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <UserContextProvider>
          <DocsBoard />
        </UserContextProvider>
      </Suspense>
    ),
  },
  {
    path: "/document/:doc_id",
    element: (
      <Suspense fallback={<Loading />}>
        <UserContextProvider>
          <Document />
        </UserContextProvider>
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loading />}>
        <Auth />
      </Suspense>
    ),
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
