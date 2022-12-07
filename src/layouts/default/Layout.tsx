import React from "react";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import DarkModeSwitcher from "../../components/dark-mode-switcher/DarkModeSwitcher";
import { useTranslation } from "react-i18next";

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/categories"}>Categories</Link>
      <div>{t("title")}</div>
      <Outlet />
      <DarkModeSwitcher />
    </div>
  );
};

export default Layout;
