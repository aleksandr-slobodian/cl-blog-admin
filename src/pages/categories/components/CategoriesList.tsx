import Divider from "@mui/material/Divider";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../../../components/dialog-confirm/DialogConfirm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { closeDialog, openDialog, selectDialog } from "../../../state/dialog";
import { Category } from "../../../types/api";
import { CategoryListItem } from "./CategoryListItem";
import { useSnackbar } from "notistack";
import { useDeleteCategoryMutation } from "../../../services/categories";
import { Virtuoso } from "react-virtuoso";

interface CategoriesListProps {
  data?: Category[];
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ data }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });
  const { t: tf } = useTranslation("main", { keyPrefix: "form" });
  const { enqueueSnackbar } = useSnackbar();

  const { isOpen, options } = useAppSelector(selectDialog);
  const dispatch = useAppDispatch();
  const handleClose = useCallback(
    async (isAgree: boolean) => {
      if (isAgree && options?.id) {
        try {
          await deleteUser(options.id);
          enqueueSnackbar(tf("success.delete"), {
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar(tf("error.delete"), {
            variant: "success",
          });
        }
      }
      dispatch(closeDialog());
    },
    [deleteUser, dispatch, enqueueSnackbar, options?.id, tf]
  );
  if (!data?.length) {
    return <div>No data!</div>;
  }
  return (
    <div>
      <Divider />
      <Virtuoso
        useWindowScroll
        data={data}
        style={{ flexGrow: 1 }}
        itemContent={(index, category) => (
          <CategoryListItem
            key={`catlst-${category.id}`}
            category={category}
            isDeleting={isDeleting}
            deleteAction={(id, title) => {
              dispatch(
                openDialog({
                  text: t<string>("text.delete", { item: title }),
                  id,
                })
              );
            }}
          />
        )}
      />
      <DialogConfirm
        open={isOpen}
        onClose={handleClose}
        title={t<string>("title.attention")}
        text={options?.text || ""}
      />
    </div>
  );
};

export default CategoriesList;
