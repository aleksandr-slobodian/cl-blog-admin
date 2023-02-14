import Stack from "@mui/material/Stack";
import React, { useCallback } from "react";
import { useUpdateUserMutation } from "../../services/users";
import { Avatar, User } from "../../types/api";
import UserAvatarsList from "./UserAvatarsList";
import UserAvatarsUploader from "./UserAvatarsUploader";

interface UserAvatarsProps {
  currentUser?: User;
}

export const UserAvatars: React.FC<UserAvatarsProps> = ({ currentUser }) => {
  const { id } = currentUser || {};
  const [updateUser] = useUpdateUserMutation();
  const updateUserAvatar = useCallback(
    ({ name }: Avatar) => {
      if (id && name) {
        updateUser({ avatar: name, id });
      }
    },
    [id, updateUser]
  );

  return (
    <Stack gap={3}>
      <UserAvatarsUploader
        userId={id || ""}
        onUploadSuccess={updateUserAvatar}
      />
      <UserAvatarsList currentUser={currentUser} />
    </Stack>
  );
};

export default UserAvatars;
