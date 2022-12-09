import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import PageLoadingIndicator from "./components/page-loading-indicator/PageLoadingIndicator";
import { Layout } from "./layouts/default";
import { PageDefault } from "./pages/default";
import { PageHome } from "./pages/home";

// import GuestOnly from "./components/guest-only/GuestOnly";
// import RequireAuth from "./components/require-auth/RequireAuth";

const PageCategories = React.lazy(
  () => import("./pages/categories/PageCategories")
);
const PageUsers = React.lazy(() => import("./pages/users/PageUsers"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <PageHome /> },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<PageLoadingIndicator />}>
            <PageCategories />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<PageLoadingIndicator />}>
            <PageUsers />
          </Suspense>
        ),
      },

      { path: "*", element: <PageDefault /> },
    ],
  },
];

export default routes;
