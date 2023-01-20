import IconButton from "@mui/material/IconButton";
import React from "react";
import { Image } from "../../../types/api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { IMAGES_BASE_PATH } from "../../../config";
import dayjs from "dayjs";

interface ImageListItemProps {
  image: Image;
  deleteAction: (id: string, title: string) => void;
  clickAction?: (id: string) => void;
  isDeleting: boolean;
}

export const ImageListItem: React.FC<ImageListItemProps> = ({
  image,
  deleteAction,
  isDeleting,
  clickAction,
}) => {
  const { name, id, originalname, date } = image;

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
        sx={{
          aspectRatio: "16 / 9",
          objectFit: "cover",
          cursor: clickAction ? "pointer" : "default",
        }}
        image={IMAGES_BASE_PATH + name}
        title={originalname}
        onClick={() => clickAction && clickAction(id)}
      />
      <CardContent sx={{ pb: 0 }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ wordBreak: "break-all" }}
        >
          {originalname}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography variant="caption" component="div">
          {dayjs(date).format("MMM D, YYYY")}
        </Typography>
        <IconButton
          disabled={isDeleting}
          onClick={() => deleteAction(id, originalname)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
