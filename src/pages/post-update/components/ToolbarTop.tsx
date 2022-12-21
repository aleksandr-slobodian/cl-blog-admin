import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ToolbarTop = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("main", { keyPrefix: "page.post-update" });

  return (
    <Toolbar
      variant="dense"
      sx={{ alignItems: "flex-start", gap: 1 }}
      disableGutters
    >
      <IconButton size="small" onClick={() => navigate(-1)} edge="start">
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h1">{t("h1")}</Typography>
    </Toolbar>
  );
};

export default ToolbarTop;
