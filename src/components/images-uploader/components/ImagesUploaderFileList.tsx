import Stack from "@mui/material/Stack";
import React from "react";
import { UploadImage } from "../../../types/api/images";
import ImagesUploaderFileListItem from "./ImagesUploaderFileListItem";

interface ImagesUploaderFileListProps {
  images?: UploadImage[];
}

export const ImagesUploaderFileList: React.FC<ImagesUploaderFileListProps> = ({
  images,
}) => {
  if (!images?.length) {
    return null;
  }
  return (
    <Stack gap={2} flexDirection={"row"} flexWrap={"wrap"}>
      {images.map((image) => (
        <ImagesUploaderFileListItem key={`itm-ufli-${image.id}`} {...image} />
      ))}
    </Stack>
  );
};

export default ImagesUploaderFileList;
