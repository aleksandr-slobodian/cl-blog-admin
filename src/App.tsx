import React from "react";
import { useRoutes } from "react-router-dom";
import styles from "./App.module.scss";
import routes from "./routes";

function App() {
  const element = useRoutes(routes);
  return <div className={styles?.App}>{element}</div>;
}

export default App;
