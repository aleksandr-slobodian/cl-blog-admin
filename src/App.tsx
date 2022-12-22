import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "./hooks";
import CssBaseline from "@mui/material/CssBaseline";
import SnackBarProvider from "./components/snack-bar-provider/SnackBarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import "dayjs/locale/uk";

function App() {
  const element = useRoutes(routes);
  const theme = useTheme();
  const { i18n } = useTranslation();
  return (
    <SnackBarProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={i18n.languages[0]}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme={true} />
          {element}
        </ThemeProvider>
      </LocalizationProvider>
    </SnackBarProvider>
  );
}

export default App;
