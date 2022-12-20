import Avatar from "@mui/material/Avatar";
import blue from "@mui/material/colors/blue";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATH_CATEGORY } from "../../../config";
import { Category } from "../../../types/api";
import { prepareEndpointPath } from "../../../utils/prepareEndpointPath";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface CategoryListItemProps {
  category: Category;
  deleteAction: (id: string, title: string) => void;
  isDeleting: boolean;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  deleteAction,
  isDeleting,
}) => {
  const { title, id } = category;

  const navigate = useNavigate();

  const href = useMemo(
    () =>
      prepareEndpointPath(APP_PATH_CATEGORY, {
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
            bgcolor: blue[500],
          }}
        >
          {title[0]}
        </Avatar>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
