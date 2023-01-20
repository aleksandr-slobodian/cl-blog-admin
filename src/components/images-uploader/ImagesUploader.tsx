import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addUploadImages, selectUploadImages } from "../../state/upload-images";
import ImagesUploaderDropzone from "./components/ImagesUploaderDropzone";
import ImagesUploaderFileList from "./components/ImagesUploaderFileList";
import ImagesUploaderControls from "./components/ImagesUploaderControls";
import Stack from "@mui/material/Stack";

export const ImagesUploader: React.FC = () => {
  const { images } = useAppSelector(selectUploadImages);
  const dispatch = useAppDispatch();

  const onDropFiles = useCallback(
    (files: File[]) => {
      dispatch(addUploadImages(files));
    },
    [dispatch]
  );

  return (
    <Stack gap={3}>
      {images.length ? null : (
        <ImagesUploaderDropzone onDropFiles={onDropFiles} />
      )}
      <ImagesUploaderFileList images={images} />
      <ImagesUploaderControls images={images} />
    </Stack>
  );
};

export default ImagesUploader;
