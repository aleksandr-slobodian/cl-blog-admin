import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRoutes } from "react-router-dom";
import styles from "./App.module.scss";
import routes from "./routes";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "./hooks";

function App() {
  const element = useRoutes(routes);
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className={styles?.App}>{element}</div>
    </ThemeProvider>
  );
}

export default App;
