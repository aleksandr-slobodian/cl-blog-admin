import React from "react";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../dialog-confirm/DialogConfirm";
import { ImageListItem } from "./components/ImageListItem";
import {
  useDeleteImageMutation,
  useListImagesQuery,
} from "../../services/images";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "@emotion/styled";
import { useDialogConfirm } from "../../hooks/dialog-confirm";
import { useMutationsSnackbar } from "../../hooks/snackbar";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface ImagesListProps {
  onItemClick?: (name: string) => void;
}

export const ImagesList: React.FC<ImagesListProps> = ({ onItemClick }) => {
  const { data, error } = useListImagesQuery();
  const [deleteImage, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteImageMutation();
  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });

  const { isOpen, dialogData, handleOpenDialog, handleCloseDialog } =
    useDialogConfirm(
      "delete-image-dialog",
      "dialog.misc.text.delete",
      deleteImage
    );

  useMutationsSnackbar(
    isSuccess,
    isError,
    "form.success.delete",
    "form.error.delete"
  );

  if (!data?.length || error) {
    return null;
  }

  return (
    <>
      <VirtuosoGrid
        useWindowScroll
        data={data}
        style={{ flexGrow: 1, display: "flex" }}
        components={{
          List: ListContainer as unknown as React.FC,
        }}
        itemContent={(index, image) => (
          <ImageListItem
            key={`imglst-${image.id}`}
            image={image}
            isDeleting={dialogData?.id === image.id && isDeleting}
            clickAction={onItemClick ? (name) => onItemClick(name) : undefined}
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
    </>
  );
};

export default ImagesList;
