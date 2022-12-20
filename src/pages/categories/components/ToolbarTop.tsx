import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import { APP_PATH_CATEGORY_CREATE } from "../../../config";

export const ToolbarTop = () => {
  const { t } = useTranslation("main", { keyPrefix: "page.categories" });

  return (
    <Toolbar
      variant="dense"
      sx={{ alignItems: "flex-start", gap: 1 }}
      disableGutters
    >
      <Typography variant="h1">{t("h1")}</Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Stack gap={1} flexDirection={"row"}>
        <Fab color="secondary" size="small" href={APP_PATH_CATEGORY_CREATE}>
          <AddIcon />
        </Fab>
      </Stack>
    </Toolbar>
  );
};

export default ToolbarTop;
