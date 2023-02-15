import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MainMenu from "../main-menu/MainMenu";
import { useAppDispatch, useAppSelector } from "../../hooks";
import DarkModeSwitcher from "../dark-mode-switcher/DarkModeSwitcher";
import LangSwitcher from "../lang-switcher/LangSwitcher";
import Stack from "@mui/material/Stack";
import {
  selectDrawerById,
  selectDrawers,
  toggleDrawer,
} from "../../state/drawers";
import UserAvatarIconButton from "../user-avatars/UserAvatarIconButton";
import { useCallback } from "react";

export const DrawerMain = () => {
  const dispatch = useAppDispatch();

  const drawers = useAppSelector(selectDrawers);
  const { isOpen } = selectDrawerById(drawers, "main-drawer") || {};

  const handleClose = useCallback(() => {
    dispatch(toggleDrawer("main-drawer"));
  }, [dispatch]);

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={handleClose}>
      <Toolbar variant="dense" sx={{ alignContent: "center" }}>
        <UserAvatarIconButton
          edge="start"
          showName={true}
          onClick={handleClose}
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton edge="end" color="inherit" onClick={handleClose}>
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
