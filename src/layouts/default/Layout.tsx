import React from "react";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import DarkModeSwitcher from "../../components/dark-mode-switcher/DarkModeSwitcher";
import { useTranslation } from "react-i18next";
import LangSwitcher from "../../components/lang-switcher/LangSwitcher";
import {
  APP_PATH_CATEGORIES,
  APP_PATH_HOME,
  APP_PATH_USERS,
} from "../../config";

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Link href={APP_PATH_HOME}>Home</Link>
      <Link href={APP_PATH_CATEGORIES}>Categories</Link>
      <Link href={APP_PATH_USERS}>Users</Link>
      <div>{t("title")}</div>
      <Outlet />
      <DarkModeSwitcher />
      <div>
        <LangSwitcher />
      </div>
    </div>
  );
};

export default Layout;
