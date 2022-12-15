import React from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/error-fallback/ErrorFallback";
import AppBar from "../../components/app-bar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DrawerMain from "../../components/drawer-main/DrawerMain";
export const Layout: React.FC = () => {
  return (
    <>
      <AppBar />
      <Toolbar variant="dense" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>

      <DrawerMain />
    </>
  );
};

export default Layout;
