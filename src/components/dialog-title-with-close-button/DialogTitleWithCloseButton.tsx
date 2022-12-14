import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface DialogTitleWithCloseButtonProps {
  children?: ReactNode;
  onClose?: () => void;
}

export const DialogTitleWithCloseButton: React.FC<
  DialogTitleWithCloseButtonProps
> = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle
      sx={{
        flexWrap: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
      {...other}
    >
      <Box>{children}</Box>
      <Box sx={{ flexGrow: 1 }} />
      {onClose ? (
        <IconButton
          sx={{ alignSelf: "flex-start" }}
          aria-label="close"
          onClick={onClose}
          edge="end"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default DialogTitleWithCloseButton;
