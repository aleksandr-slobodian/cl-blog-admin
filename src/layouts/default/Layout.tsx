import React from "react";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import DarkModeSwitcher from "../../components/dark-mode-switcher/DarkModeSwitcher";

export const Layout: React.FC = () => {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/categories"}>Categories</Link>
      <Outlet />
      <DarkModeSwitcher />
    </div>
  );
};

export default Layout;
