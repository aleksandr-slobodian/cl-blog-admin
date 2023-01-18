import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useState } from "react";
import { UploadImage } from "../../../types/api/images";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks";
import {
  clearUploadImages,
  startUploadImage,
  asyncAbortUploadingImages,
} from "../../../state/upload-images";
import Button from "@mui/material/Button";
interface ImagesUploaderControlsProps {
  images?: UploadImage[];
}

const MULTIPLE_UPLOAD_MAX_COUNT = 2;

export const ImagesUploaderControls: React.FC<ImagesUploaderControlsProps> = ({
  images,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [isUploading, setIsUploading] = useState(false);
  const [isAllDone, setIsAllDone] = useState(false);

  useEffect(() => {
    if (isUploading) {
      const imagesUploading =
        images?.filter(
          ({ status }) => status === "uploading" || status === "started"
        ) || [];

      const imagesForUpload = images?.filter(
        ({ status }) => status === undefined
      );

      if (
        imagesForUpload?.length &&
        imagesUploading.length < MULTIPLE_UPLOAD_MAX_COUNT
      ) {
        dispatch(startUploadImage(imagesForUpload[0].id));
      }

      const isDoneImages = images?.filter(
        ({ status }) => status === "fulfilled" || status === "failed"
      );
      if (isDoneImages?.length === images?.length) {
        setIsUploading(false);
        setIsAllDone(true);
      }
    }
    if (isAllDone && !images?.length) {
      setIsAllDone(false);
    }
  }, [dispatch, images, isAllDone, isUploading]);

  const handleUpload = useCallback(() => {
    images?.length && setIsUploading(true);
  }, [images?.length]);

  const handleClearAll = useCallback(async () => {
    if (images?.length) {
      await dispatch(asyncAbortUploadingImages());
      dispatch(clearUploadImages());
    }
  }, [dispatch, images?.length]);

  if (!images?.length) {
    return null;
  }

  return (
    <Stack flexDirection="row" gap={2}>
      <LoadingButton
        disabled={isAllDone}
        loading={isUploading}
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleUpload}
      >
        {t("button.upload-all")}
      </LoadingButton>
      <Button onClick={handleClearAll}>{t("button.clear-all")}</Button>
    </Stack>
  );
};

export default ImagesUploaderControls;
