import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addUploadImages, selectUploadImages } from "../../state/upload-images";
import ImagesUploaderDropzone from "./components/ImagesUploaderDropzone";
import ImagesUploaderFileList from "./components/ImagesUploaderFileList";

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
    <>
      {images.length ? null : (
        <ImagesUploaderDropzone onDropFiles={onDropFiles} />
      )}
      <ImagesUploaderFileList images={images} />
    </>
  );
};

export default ImagesUploader;
