import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  closeDrawer,
  openDrawer,
  selectDrawerById,
  selectDrawers,
} from "../../state/drawers";
import { KeyValue } from "../../types";
import { useAppDispatch, useAppSelector } from "../redux";

export function useDialogConfirm(
  dialogName: string,
  dialogTextAlias: string,
  callback: (id: string) => void,
  translationNS = "main"
): {
  dialogData: KeyValue;
  isOpen: boolean;
  handleOpenDialog: (id: string, title: string) => void;
  handleCloseDialog: (isAgree: boolean) => void;
} {
  const { t } = useTranslation(translationNS);

  const drawers = useAppSelector(selectDrawers);
  const { isOpen, data: dialogData } =
    selectDrawerById(drawers, dialogName) || {};

  const dispatch = useAppDispatch();

  const handleOpenDialog = useCallback(
    (id: string, title: string) => {
      dispatch(
        openDrawer({
          name: dialogName,
          data: {
            text: t(dialogTextAlias, { item: title }),
            id,
          },
        })
      );
    },
    [dialogName, dialogTextAlias, dispatch, t]
  );

  const handleCloseDialog = useCallback(
    (isAgree: boolean) => {
      dispatch(closeDrawer({ name: dialogName }));
      if (isAgree && dialogData?.id) {
        callback(dialogData.id);
      }
    },
    [dispatch, dialogName, dialogData?.id, callback]
  );

  return {
    isOpen: isOpen || false,
    dialogData: dialogData || {},
    handleOpenDialog,
    handleCloseDialog,
  };
}

export default useDialogConfirm;
