import Avatar from "@mui/material/Avatar";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Post } from "../../types/api";
import {
  APP_PATH_POST,
  APP_PATH_USER,
  AVATARS_BASE_PATH,
  IMAGES_BASE_PATH,
} from "../../config";
import { prepareEndpointPath } from "../../utils/prepareEndpointPath";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useDateTime } from "../../hooks/date-time";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack/Stack";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";

interface PostListItemProps {
  post: Post;
  deleteAction: (id: string, title: string) => void;
  isDeleting: boolean;
}

export const PostListItem: React.FC<PostListItemProps> = ({
  post,
  deleteAction,
  isDeleting,
}) => {
  const {
    title,
    id,
    isPublished,
    alias,
    datePublished,
    image,
    subtitle,
    user,
  } = post;

  const navigate = useNavigate();

  const href = useMemo(
    () =>
      prepareEndpointPath(APP_PATH_POST, {
        id,
      }),
    [id]
  );

  const handleItemEdit = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  const formatedDate = useDateTime(datePublished * 1000, "long", "datetime");

  const handleAvatarClick = useCallback(() => {
    if (user?.id) {
      navigate(
        prepareEndpointPath(APP_PATH_USER, {
          id: user.id,
        })
      );
    }
  }, [navigate, user?.id]);

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              cursor: "pointer",
              mr: 1,
              bgcolor: isPublished ? blue[500] : grey[300],
            }}
            src={
              user?.avatar ? `${AVATARS_BASE_PATH}${user?.avatar}` : undefined
            }
            title={user ? user.name : ""}
            onClick={handleAvatarClick}
          >
            {user ? user.name[0] : title[0]}
          </Avatar>
        }
        action={
          <IconButton
            disabled={isDeleting}
            onClick={() => deleteAction(id, title)}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        title={formatedDate}
        subheader={`/${alias}`}
      />
      <CardMedia
        component="img"
        sx={{
          aspectRatio: "16 / 9",
          objectFit: "cover",
          cursor: "pointer",
        }}
        image={IMAGES_BASE_PATH + image}
        title={title}
        onClick={handleItemEdit}
      />
      <CardContent>
        <Stack sx={{ flexDirection: "row" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={handleItemEdit}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ ml: 1 }}>
            <IconButton onClick={handleItemEdit} edge="end">
              <EditIcon />
            </IconButton>
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};
