import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { UploadImage } from "../../../types/api/images";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAppDispatch } from "../../../hooks";
import { deleteUploadImage, uploadImage } from "../../../state/upload-images";
import DoneIcon from "@mui/icons-material/Done";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgressWithLabel from "../../circular-progress-with-label/CircularProgressWithLabel";
import { useTranslation } from "react-i18next";

export const ImagesUploaderFileListItem: React.FC<UploadImage> = ({
  name,
  file,
  id,
  status,
  progress,
}) => {
  const { t } = useTranslation("main", { keyPrefix: "form.button" });

  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const dispatch = useAppDispatch();

  const uploadAbort = useRef<() => void>();

  const handleUpload = useCallback(() => {
    const upload = dispatch(uploadImage(id));
    uploadAbort.current = upload.abort;
  }, [dispatch, id]);

  const handleDelete = useCallback(() => {
    if (status === "uploading" && uploadAbort.current) {
      uploadAbort.current();
    }
    dispatch(deleteUploadImage(id));
  }, [dispatch, id, status]);

  return (
    <Card
      sx={(theme) => ({
        width: 155,
        [theme.breakpoints.up("sm")]: {
          width: 170,
        },
      })}
    >
      <CardMedia
        component="img"
        sx={{ aspectRatio: "16 / 9", objectFit: "cover" }}
        image={preview}
        title={name}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ wordBreak: "break-all" }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        {status === "failed" ? (
          <ErrorOutlineIcon color="error" />
        ) : status === "fulfilled" ? (
          <DoneIcon color="success" />
        ) : status === "uploading" ? (
          <CircularProgressWithLabel value={progress || 0} size={32} />
        ) : (
          <IconButton
            onClick={handleUpload}
            size="small"
            title={t<string>("upload")}
          >
            <FileUploadIcon color="primary" />
          </IconButton>
        )}
        <IconButton onClick={handleDelete} size="small">
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ImagesUploaderFileListItem;
