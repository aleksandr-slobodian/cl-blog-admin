import Avatar from "@mui/material/Avatar";
import { SxProps, Theme } from "@mui/material/styles";
import React, { MouseEventHandler } from "react";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  sx,
  onClick,
}) => {
  return <Avatar sx={sx} alt={alt} src={src} onClick={onClick} />;
};

export default UserAvatar;
