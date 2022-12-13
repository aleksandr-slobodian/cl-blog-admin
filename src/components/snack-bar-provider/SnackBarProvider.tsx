import { SnackbarProvider, SnackbarKey } from "notistack";
import React, { ReactNode, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ErrorIcon from "@mui/icons-material/Error";

interface SnackBarProviderProps {
  children?: ReactNode;
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children,
}) => {
  const notistackRef = useRef<SnackbarProvider | null>(null);
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current?.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      preventDuplicate
      autoHideDuration={5000}
      iconVariant={{
        error: <ErrorIcon style={{ marginRight: 8 }} />,
      }}
      ref={notistackRef}
      action={(key) => (
        <IconButton
          color="inherit"
          edge="end"
          size="small"
          onClick={onClickDismiss(key)}
        >
          <CloseIcon />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackBarProvider;
