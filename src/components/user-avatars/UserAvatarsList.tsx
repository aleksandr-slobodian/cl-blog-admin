import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  useDeleteAvatarMutation,
  useListAvatarsQuery,
} from "../../services/avatars";
import { useUpdateUserMutation } from "../../services/users";
import {
  closeDrawer,
  openDrawer,
  selectDrawerById,
  selectDrawers,
} from "../../state/drawers";
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

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] =
    useDeleteAvatarMutation();

  const handleClick = useCallback((avatar: Avatar) => {
    setSelected(avatar);
  }, []);

  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });
  const { t: tf } = useTranslation("main", { keyPrefix: "form" });
  const { enqueueSnackbar } = useSnackbar();

  const isButtonDeleteDisabled = !selected?.name || avatar === selected?.name;

  const drawers = useAppSelector(selectDrawers);
  const { isOpen, data: dialogData } =
    selectDrawerById(drawers, "delete-avatar-dialog") || {};

  const dispatch = useAppDispatch();
  const handleOnDeleteClose = useCallback(
    async (isAgree: boolean) => {
      dispatch(closeDrawer({ name: "delete-avatar-dialog" }));
      if (isAgree && selected) {
        try {
          await deleteAvatar(selected.id);
          enqueueSnackbar(tf("success.delete"), {
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar(tf("error.delete"), {
            variant: "success",
          });
        }
      }
    },
    [deleteAvatar, dispatch, enqueueSnackbar, selected, tf]
  );

  const handleOpenDeleteDialog = useCallback(() => {
    dispatch(
      openDrawer({
        name: "delete-avatar-dialog",
        data: {
          text: t("text.delete", { item: selected?.originalname }),
        },
      })
    );
  }, [dispatch, selected, t]);

  const [updateUser, { isLoading: isLoadingApplyAvatar }] =
    useUpdateUserMutation();
  const handleApply = useCallback(async () => {
    if (id) {
      try {
        updateUser({ avatar: selected?.name, id });
        enqueueSnackbar(tf("success.update"), {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(tf("error.update"), {
          variant: "success",
        });
      }
    }
  }, [enqueueSnackbar, id, selected?.name, tf, updateUser]);

  return (
    <Stack gap={3}>
      <Stack flexDirection="row" flexWrap="wrap" gap={1}>
        <UserAvatarsListItem
          key={`itm-avtr-0`}
          avatar={{
            id: "",
            name: "",
            originalname: "",
            userId: "",
            date: 0,
          }}
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
        onClose={handleOnDeleteClose}
        title={t<string>("title.attention")}
        text={dialogData?.text || ""}
      />
    </Stack>
  );
};

export default UserAvatarsList;
