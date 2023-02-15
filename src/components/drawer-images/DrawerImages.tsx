import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
  selectDrawerById,
  selectDrawers,
  toggleDrawer,
} from "../../state/drawers";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ImagesUploader from "../images-uploader/ImagesUploader";
import { ImagesList } from "../images-list/ImagesList";

export const DrawerImages: React.FC<{
  onItemClick?: (name: string) => void;
}> = ({ onItemClick }) => {
  const drawers = useAppSelector(selectDrawers);
  const { isOpen } = selectDrawerById(drawers, "images-drawer") || {};
  const dispatch = useAppDispatch();
  const { t } = useTranslation("main", { keyPrefix: "drawer.select-image" });
  const [value, setValue] = useState("1");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Drawer
      anchor={"right"}
      open={isOpen}
      onClose={() => dispatch(toggleDrawer("images-drawer"))}
    >
      <Toolbar
        variant="dense"
        sx={{ alignContent: "center", justifyContent: "flex-end" }}
      >
        <Typography variant="h6">{t("title")}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => dispatch(toggleDrawer("images-drawer"))}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box width={"100vw"} maxWidth={800} p={3} flexGrow={1}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            <TabList onChange={handleChange}>
              <Tab label={t("tab-1")} value="1" />
              <Tab label={t("tab-2")} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <ImagesList
              onItemClick={
                onItemClick ? (name) => onItemClick(name) : undefined
              }
            />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <ImagesUploader />
          </TabPanel>
        </TabContext>
      </Box>
    </Drawer>
  );
};

export default DrawerImages;
