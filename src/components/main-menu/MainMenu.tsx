import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import { useTranslation } from "react-i18next";
import {
  APP_PATH_CATEGORIES,
  APP_PATH_HOME,
  APP_PATH_IMAGES,
  APP_PATH_LOGIN,
  APP_PATH_POSTS,
  APP_PATH_USERS,
} from "../../config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, selectAuth } from "../../state/auth";
import { toggleMainDrawer } from "../../state/main-drawer";

export const MainMenu = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("main", { keyPrefix: "main-menu" });

  return (
    <div>
      <ListItem>
        <Link onClick={() => dispatch(toggleMainDrawer())} href={APP_PATH_HOME}>
          {t("home")}
        </Link>
      </ListItem>
      {user ? (
        <>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_CATEGORIES}
            >
              {t("categories")}
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_POSTS}
            >
              {t("posts")}
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_IMAGES}
            >
              {t("images")}
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_USERS}
            >
              {t("users")}
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => {
                dispatch(toggleMainDrawer());
                dispatch(logout());
              }}
            >
              {t("logout")}
            </Link>
          </ListItem>
        </>
      ) : (
        <ListItem>
          <Link
            onClick={() => dispatch(toggleMainDrawer())}
            href={APP_PATH_LOGIN}
          >
            Login
          </Link>
        </ListItem>
      )}
    </div>
  );
};

export default MainMenu;
