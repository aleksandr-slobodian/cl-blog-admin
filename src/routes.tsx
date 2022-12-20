import React, { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import PageLoadingIndicator from "./components/page-loading-indicator/PageLoadingIndicator";
import { Layout } from "./layouts/default";
import { PageDefault } from "./pages/default";
import { PageHome } from "./pages/home";
import { PageLogin } from "./pages/login";

import GuestOnly from "./components/guest-only/GuestOnly";
import RequireAuth from "./components/require-auth/RequireAuth";

const PageCategories = React.lazy(
  () => import("./pages/categories/PageCategories")
);
const PageCategoryCreate = React.lazy(
  () => import("./pages/category-create/PageCategoryCreate")
);
const PageCategoryUpdate = React.lazy(
  () => import("./pages/category-update/PageCategoryUpdate")
);
const PageUsers = React.lazy(() => import("./pages/users/PageUsers"));
const PageUserCreate = React.lazy(
  () => import("./pages/user-create/PageUserCreate")
);
const PageUserUpdate = React.lazy(
  () => import("./pages/user-update/PageUserUpdate")
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <PageHome />
          </RequireAuth>
        ),
      },
      {
        path: "/categories",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageCategories />
                </RequireAuth>
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageCategoryCreate />
                </RequireAuth>
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageCategoryUpdate />
                </RequireAuth>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/users",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageUsers />
                </RequireAuth>
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageUserCreate />
                </RequireAuth>
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoadingIndicator />}>
                <RequireAuth>
                  <PageUserUpdate />
                </RequireAuth>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <GuestOnly>
            <PageLogin />
          </GuestOnly>
        ),
      },
      { path: "*", element: <PageDefault /> },
    ],
  },
];

export default routes;
