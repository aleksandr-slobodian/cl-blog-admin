import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MainMenu from "../main-menu/MainMenu";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectMainDrawer, toggleMainDrawer } from "../../state/main-drawer";
import DarkModeSwitcher from "../dark-mode-switcher/DarkModeSwitcher";
import LangSwitcher from "../lang-switcher/LangSwitcher";
import Stack from "@mui/material/Stack";

export const DrawerMain = () => {
  const { isOpen } = useAppSelector(selectMainDrawer);
  const dispatch = useAppDispatch();
  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={() => dispatch(toggleMainDrawer())}
    >
      <Toolbar
        variant="dense"
        sx={{ alignContent: "center", justifyContent: "flex-end" }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => dispatch(toggleMainDrawer())}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box width={300} p={3} flexGrow={1}>
        <MainMenu />
      </Box>
      <Divider />
      <Stack gap={2} p={3}>
        <DarkModeSwitcher />
        <LangSwitcher />
      </Stack>
    </Drawer>
  );
};

export default DrawerMain;
