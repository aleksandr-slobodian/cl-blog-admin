import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../dialog-confirm/DialogConfirm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeDialog, openDialog, selectDialog } from "../../state/dialog";
import { ImageListItem } from "./components/ImageListItem";
import { useSnackbar } from "notistack";
import {
  useDeleteImageMutation,
  useListImagesQuery,
} from "../../services/images";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "@emotion/styled";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

interface ImagesListProps {
  onItemClick?: (id: string) => void;
}

export const ImagesList: React.FC<ImagesListProps> = ({ onItemClick }) => {
  const { data, error } = useListImagesQuery();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();
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
          await deleteImage(options.id);
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
    [deleteImage, dispatch, enqueueSnackbar, options?.id, tf]
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
            isDeleting={isDeleting}
            clickAction={onItemClick ? (id) => onItemClick(id) : undefined}
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
    </>
  );
};

export default ImagesList;
