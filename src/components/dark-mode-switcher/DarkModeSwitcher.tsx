import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectDarkMode, setMode } from "../../state/theme/themeSlice";
import { useTranslation } from "react-i18next";

export const DarkModeSwitcher = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const { t } = useTranslation("main", { keyPrefix: "theme" });

  return (
    <ButtonGroup size="small">
      <Button
        variant={darkMode === false ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(false))}
        startIcon={<LightModeIcon />}
      >
        {t("light")}
      </Button>
      <Button
        variant={darkMode === undefined ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(undefined))}
        startIcon={<SettingsBrightnessIcon />}
      >
        {t("auto")}
      </Button>
      <Button
        variant={darkMode === true ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(true))}
        startIcon={<DarkModeIcon />}
      >
        {t("dark")}
      </Button>
    </ButtonGroup>
  );
};

export default DarkModeSwitcher;
