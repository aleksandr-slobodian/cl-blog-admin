import Avatar from "@mui/material/Avatar";
import blue from "@mui/material/colors/blue";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATH_USER } from "../../../config";
import { User } from "../../../types/api";
import { prepareEndpointPath } from "../../../utils/prepareEndpointPath";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface UserListItemProps {
  user: User;
  deleteAction: (id: string) => void;
  isDeleting: boolean;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  user,
  deleteAction,
  isDeleting,
}) => {
  const { name, id } = user;

  const navigate = useNavigate();

  const href = useMemo(
    () =>
      prepareEndpointPath(APP_PATH_USER, {
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
        <IconButton disabled={isDeleting} onClick={() => deleteAction(id)}>
          <DeleteForeverIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={handleItemClick}>
        <Avatar
          sx={{
            mr: 1,
            bgcolor: blue[500],
          }}
        >
          {name[0]}
        </Avatar>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};