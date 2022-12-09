import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDebounce } from "react-use";
export const PageLoadingIndicator = () => {
  const [isShow, setIsShow] = useState(false);
  useDebounce(
    () => {
      setIsShow(true);
    },
    1000,
    []
  );

  if (!isShow) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoadingIndicator;
