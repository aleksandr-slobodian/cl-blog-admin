import { SxProps, Theme } from "@mui/material/styles";
import React, { useCallback, useMemo } from "react";
import { AVATARS_BASE_PATH } from "../../config";
import { Avatar } from "../../types/api";
import UserAvatar from "./UserAvatar";

interface UserAvatarsListItemProps {
  avatar: Avatar;
  isSelected?: boolean;
  onItemClick?: (avatar: Avatar) => void;
}

export const UserAvatarsListItem: React.FC<UserAvatarsListItemProps> = ({
  avatar,
  isSelected,
  onItemClick,
}) => {
  const { name } = avatar;

  const avatarStyles = useMemo<SxProps<Theme>>(
    () =>
      ({ palette }) => ({
        width: 72,
        height: 72,
        borderColor: isSelected ? palette.primary.main : palette.grey[300],
        borderWidth: 3,
        borderStyle: "solid",
      }),
    [isSelected]
  );

  const handleClick = useCallback(() => {
    if (onItemClick) {
      onItemClick(avatar);
    }
  }, [avatar, onItemClick]);

  return (
    <UserAvatar
      sx={avatarStyles}
      src={name ? `${AVATARS_BASE_PATH}${name}` : undefined}
      onClick={handleClick}
    />
  );
};

export default UserAvatarsListItem;
