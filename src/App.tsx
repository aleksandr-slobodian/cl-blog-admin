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

function App() {
  const element = useRoutes(routes);
  const theme = useTheme();
  return (
    <SnackBarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme={true} />
        {element}
      </ThemeProvider>
    </SnackBarProvider>
  );
}

export default App;
