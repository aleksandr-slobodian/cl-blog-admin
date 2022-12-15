import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import {
  APP_PATH_CATEGORIES,
  APP_PATH_HOME,
  APP_PATH_USERS,
} from "../../config";
import { useAppDispatch } from "../../hooks";
import { toggleMainDrawer } from "../../state/main-drawer";

export const MainMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <ListItem>
        <Link onClick={() => dispatch(toggleMainDrawer())} href={APP_PATH_HOME}>
          Home
        </Link>
      </ListItem>
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
    </div>
  );
};

export default MainMenu;
