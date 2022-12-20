import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
import { APP_PATH_CATEGORIES } from "../../../config";

export const ToolbarTop = () => {
  const { t } = useTranslation("main", { keyPrefix: "page.category-create" });

  return (
    <Toolbar
      variant="dense"
      sx={{ alignItems: "flex-start", gap: 1 }}
      disableGutters
    >
      <IconButton size="small" href={APP_PATH_CATEGORIES} edge="start">
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h1">{t("h1")}</Typography>
    </Toolbar>
  );
};

export default ToolbarTop;
