import IconButton from "@mui/material/IconButton";
import Stack from "@mui/system/Stack";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATH_USER, AVATARS_BASE_PATH } from "../../config";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../state/auth";
import { prepareEndpointPath } from "../../utils/prepareEndpointPath";
import UserAvatar from "./UserAvatar";
import Link from "@mui/material/Link";

interface UserAvatarIconButtonProps {
  edge?: false | "end" | "start";
  showName?: boolean;
  onClick?: () => void;
}

export const UserAvatarIconButton: React.FC<UserAvatarIconButtonProps> = ({
  edge,
  showName,
  onClick,
}) => {
  const { user } = useAppSelector(selectAuth);
  const href = useMemo(
    () =>
      prepareEndpointPath(APP_PATH_USER, {
        id: user?.id,
      }),
    [user?.id]
  );
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(href);
    if (onClick) {
      onClick();
    }
  }, [href, navigate, onClick]);

  const Label = useMemo(
    () => (
      <Link variant="subtitle1" onClick={handleClick}>
        {user?.name}
      </Link>
    ),
    [handleClick, user?.name]
  );

  return (
    <Stack flexDirection="row" alignItems="center" gap={0.5}>
      {showName && edge === "end" ? Label : null}
      <IconButton edge={edge} onClick={handleClick} title={user?.name}>
        <UserAvatar
          sx={{ width: 36, height: 36 }}
          src={user?.avatar ? `${AVATARS_BASE_PATH}${user?.avatar}` : undefined}
        />
      </IconButton>
      {showName && edge === "start" ? Label : null}
    </Stack>
  );
};

export default UserAvatarIconButton;
