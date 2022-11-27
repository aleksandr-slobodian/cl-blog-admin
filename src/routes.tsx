import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "./layouts/default";
import { PageDefault } from "./pages/default";
import { PageHome } from "./pages/home";

// import GuestOnly from "./components/guest-only/GuestOnly";
// import RequireAuth from "./components/require-auth/RequireAuth";
import PageLoadingIndicator from "./components/page-loading-indicator/PageLoadingIndicator";

const PageCategories = React.lazy(
  () => import("./pages/categories/PageCategories")
);

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

      { path: "*", element: <PageDefault /> },
    ],
  },
];

export default routes;
