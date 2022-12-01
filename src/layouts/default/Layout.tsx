import React from "react";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";

export const Layout: React.FC = () => {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/categories"}>Categories</Link>
      <Outlet />
    </div>
  );
};

export default Layout;
