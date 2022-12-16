import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import {
  APP_PATH_CATEGORIES,
  APP_PATH_HOME,
  APP_PATH_LOGIN,
  APP_PATH_USERS,
} from "../../config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout, selectAuth } from "../../state/auth";
import { toggleMainDrawer } from "../../state/main-drawer";

export const MainMenu = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  return (
    <div>
      <ListItem>
        <Link onClick={() => dispatch(toggleMainDrawer())} href={APP_PATH_HOME}>
          Home
        </Link>
      </ListItem>
      {user ? (
        <>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_CATEGORIES}
            >
              Categories
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => dispatch(toggleMainDrawer())}
              href={APP_PATH_USERS}
            >
              Users
            </Link>
          </ListItem>
          <ListItem>
            <Link
              onClick={() => {
                dispatch(toggleMainDrawer());
                dispatch(logout());
              }}
            >
              Logout
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
