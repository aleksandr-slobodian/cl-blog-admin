import Divider from "@mui/material/Divider";
import React from "react";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../../../components/dialog-confirm/DialogConfirm";
import { Category } from "../../../types/api";
import { CategoryListItem } from "./CategoryListItem";
import { useDeleteCategoryMutation } from "../../../services/categories";
import { Virtuoso } from "react-virtuoso";
import { useDialogConfirm } from "../../../hooks/dialog-confirm";
import { useMutationsSnackbar } from "../../../hooks/snackbar";

interface CategoriesListProps {
  data?: Category[];
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ data }) => {
  const [deleteCategory, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteCategoryMutation();

  const { isOpen, dialogData, handleOpenDialog, handleCloseDialog } =
    useDialogConfirm(
      "delete-category-dialog",
      "dialog.misc.text.delete",
      deleteCategory
    );

  useMutationsSnackbar(
    isSuccess,
    isError,
    "form.success.delete",
    "form.error.delete"
  );

  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });

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
            isDeleting={dialogData?.id === category.id && isDeleting}
            deleteAction={handleOpenDialog}
          />
        )}
      />
      <DialogConfirm
        open={isOpen}
        onClose={handleCloseDialog}
        title={t<string>("title.attention")}
        text={dialogData?.text || ""}
      />
    </div>
  );
};

export default CategoriesList;
