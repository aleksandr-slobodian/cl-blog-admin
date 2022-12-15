import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ButtonShowDrawerMainMenu from "../button-show-drawer-main-menu/ButtonShowDrawerMainMenu";

import MainLogo from "../main-logo/MainLogo";

export const AppBar = () => {
  return (
    <MuiAppBar position="fixed" enableColorOnDark>
      <Toolbar
        variant="dense"
        sx={{ maxWidth: 1200, alignSelf: "center", width: "100%" }}
      >
        <ButtonShowDrawerMainMenu />
        <MainLogo />
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
