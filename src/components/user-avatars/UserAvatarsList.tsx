import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDialogConfirm } from "../../hooks/dialog-confirm";
import { useMutationsSnackbar } from "../../hooks/snackbar";
import {
  useDeleteAvatarMutation,
  useListAvatarsQuery,
} from "../../services/avatars";
import { useUpdateUserMutation } from "../../services/users";
import { Avatar, User } from "../../types/api";
import DialogConfirm from "../dialog-confirm/DialogConfirm";
import UserAvatarsListItem from "./UserAvatarsListItem";

interface UserAvatarsListProps {
  currentUser?: User;
}

export const UserAvatarsList: React.FC<UserAvatarsListProps> = ({
  currentUser,
}) => {
  const { id, avatar } = currentUser || {};
  const { data } = useListAvatarsQuery({ userId: id }, { skip: !id });
  const [selected, setSelected] = useState<Avatar>();
  useEffect(() => {
    if (data?.length) {
      const av = data?.filter(({ name }) => name === avatar);
      if (av.length) {
        setSelected(av[0]);
      }
    }
  }, [avatar, data]);

  const [
    deleteAvatar,
    {
      isLoading: isLoadingDeleteAvatar,
      isSuccess: isSuccessDeleteAvatar,
      isError: isErrorDeleteAvatar,
    },
  ] = useDeleteAvatarMutation();

  const handleClick = useCallback((avatar: Avatar) => {
    setSelected(avatar);
  }, []);

  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });
  const { t: tf } = useTranslation("main", { keyPrefix: "form" });

  const isButtonDeleteDisabled = !selected?.name || avatar === selected?.name;

  const { isOpen, dialogData, handleOpenDialog, handleCloseDialog } =
    useDialogConfirm(
      "delete-avatar-dialog",
      "dialog.misc.text.delete",
      deleteAvatar
    );

  useMutationsSnackbar(
    isSuccessDeleteAvatar,
    isErrorDeleteAvatar,
    "form.success.delete",
    "form.error.delete"
  );

  const handleOpenDeleteDialog = useCallback(() => {
    if (selected) {
      handleOpenDialog(selected?.id, selected?.originalname);
    }
  }, [handleOpenDialog, selected]);

  const [
    updateUser,
    {
      isLoading: isLoadingApplyAvatar,
      isSuccess: isSuccessApplyAvatar,
      isError: isErrorApplyAvatar,
    },
  ] = useUpdateUserMutation();
  const handleApply = useCallback(() => {
    if (id) {
      updateUser({ avatar: selected?.name, id });
    }
  }, [id, selected?.name, updateUser]);

  useMutationsSnackbar(
    isSuccessApplyAvatar,
    isErrorApplyAvatar,
    "form.success.update",
    "form.error.update"
  );

  const emptyAvatar = useMemo(
    () => ({
      id: "",
      name: "",
      originalname: "",
      userId: "",
      date: 0,
    }),
    []
  );

  return (
    <Stack gap={3}>
      <Stack flexDirection="row" flexWrap="wrap" gap={1}>
        <UserAvatarsListItem
          key={`itm-avtr-0`}
          avatar={emptyAvatar}
          isSelected={!selected?.name}
          onItemClick={handleClick}
        />
        {data?.map((avatar) => (
          <UserAvatarsListItem
            key={`itm-avtr-${avatar.id}`}
            avatar={avatar}
            isSelected={avatar.name === selected?.name}
            onItemClick={handleClick}
          />
        ))}
      </Stack>
      <Stack flexDirection="row" gap={2}>
        <LoadingButton
          loading={isLoadingApplyAvatar}
          disabled={avatar === selected?.name}
          variant="contained"
          onClick={handleApply}
        >
          {tf("button.apply")}
        </LoadingButton>
        <LoadingButton
          loading={isLoadingDeleteAvatar}
          disabled={isButtonDeleteDisabled}
          variant="outlined"
          onClick={handleOpenDeleteDialog}
        >
          {tf("button.delete")}
        </LoadingButton>
      </Stack>
      <DialogConfirm
        open={isOpen}
        onClose={handleCloseDialog}
        title={t<string>("title.attention")}
        text={dialogData?.text || ""}
      />
    </Stack>
  );
};

export default UserAvatarsList;
