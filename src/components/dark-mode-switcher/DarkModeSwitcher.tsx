import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectDarkMode, setMode } from "../../state/theme/themeSlice";

export const DarkModeSwitcher = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <ButtonGroup size="small">
      <Button
        variant={darkMode === false ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(false))}
        startIcon={<LightModeIcon />}
      >
        {"light"}
      </Button>
      <Button
        variant={darkMode === undefined ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(undefined))}
        startIcon={<SettingsBrightnessIcon />}
      >
        {"auto"}
      </Button>
      <Button
        variant={darkMode === true ? "contained" : "outlined"}
        onClick={() => dispatch(setMode(true))}
        startIcon={<DarkModeIcon />}
      >
        {"dark"}
      </Button>
    </ButtonGroup>
  );
};

export default DarkModeSwitcher;
