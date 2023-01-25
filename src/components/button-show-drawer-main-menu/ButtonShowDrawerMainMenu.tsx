import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch } from "../../hooks";
import { toggleDrawer } from "../../state/drawers";

export const ButtonShowDrawerMainMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <IconButton
      onClick={() => dispatch(toggleDrawer("main-drawer"))}
      color="inherit"
      edge="start"
    >
      <MenuIcon />
    </IconButton>
  );
};

export default ButtonShowDrawerMainMenu;
