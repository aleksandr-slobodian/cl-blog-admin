import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { toggleMainDrawer } from "../../state/main-drawer";
import { useAppDispatch } from "../../hooks";

export const ButtonShowDrawerMainMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      onClick={() => dispatch(toggleMainDrawer())}
      color="inherit"
      edge="start"
    >
      <MenuIcon />
    </IconButton>
  );
};

export default ButtonShowDrawerMainMenu;
