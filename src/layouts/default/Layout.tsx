import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/categories"}>Categories</Link>
      <Outlet />
    </div>
  );
};

export default Layout;
