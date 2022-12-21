import Avatar from "@mui/material/Avatar";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATH_POST } from "../../../config";
import { Post } from "../../../types/api";
import { prepareEndpointPath } from "../../../utils/prepareEndpointPath";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  const { title, id, isPublished, alias } = post;

  const navigate = useNavigate();

  const href = useMemo(
    () =>
      prepareEndpointPath(APP_PATH_POST, {
        id,
      }),
    [id]
  );

  const handleItemClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  return (
    <ListItem
      disablePadding
      divider={true}
      secondaryAction={
        <IconButton
          disabled={isDeleting}
          onClick={() => deleteAction(id, title)}
        >
          <DeleteForeverIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={handleItemClick}>
        <Avatar
          sx={{
            mr: 1,
            bgcolor: isPublished ? blue[500] : grey[300],
          }}
        >
          {title[0]}
        </Avatar>
        <ListItemText primary={title} secondary={`/${alias}`} />
      </ListItemButton>
    </ListItem>
  );
};
