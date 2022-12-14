import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitleWithCloseButton from "../dialog-title-with-close-button/DialogTitleWithCloseButton";
import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import TransitionSlideUp from "../transition-slide-up/TransitionSlideUp";
import { useTranslation } from "react-i18next";

interface DialogConfirmProps {
  open: boolean;
  onClose?: (isAgree: boolean) => void;
  title?: string;
  text: string;
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({
  open = false,
  onClose,
  title,
  text,
}) => {
  const theme = useTheme();
  const isSmallScr = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc.button",
  });

  const handleClose = useCallback(
    (isAgree = false) => {
      onClose && onClose(isAgree);
    },
    [onClose]
  );

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      TransitionComponent={TransitionSlideUp}
      fullScreen={isSmallScr}
    >
      {title ? (
        <DialogTitleWithCloseButton onClose={() => handleClose()}>
          {title}
        </DialogTitleWithCloseButton>
      ) : null}
      <DialogContent sx={{ display: "flex", alignItems: "center" }}>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions sx={isSmallScr ? { p: 3 } : { paddingX: 2 }}>
        <Button
          variant={isSmallScr ? "outlined" : "text"}
          onClick={() => handleClose()}
        >
          {t("disagree")}
        </Button>
        <Button
          variant={isSmallScr ? "contained" : "text"}
          onClick={() => handleClose(true)}
          autoFocus
        >
          {t("agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
