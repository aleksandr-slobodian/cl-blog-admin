import Divider from "@mui/material/Divider";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../../../components/dialog-confirm/DialogConfirm";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useDeleteUserMutation } from "../../../services/users";
import { closeDialog, openDialog, selectDialog } from "../../../state/dialog";
import { User } from "../../../types/api";
import { UserListItem } from "./UserListItem";
import { useSnackbar } from "notistack";

interface UsersListProps {
  users?: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });
  const { t: tf } = useTranslation("main", { keyPrefix: "form" });
  const { enqueueSnackbar } = useSnackbar();

  const { isOpen, options } = useAppSelector(selectDialog);
  const dispatch = useAppDispatch();
  const handleClose = useCallback(
    async (isAgree: boolean) => {
      if (isAgree && options?.id) {
        try {
          await deleteUser(options.id);
          enqueueSnackbar(tf("success.delete"), {
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar(tf("error.delete"), {
            variant: "success",
          });
        }
      }
      dispatch(closeDialog());
    },
    [deleteUser, dispatch, enqueueSnackbar, options?.id, tf]
  );
  if (!users?.length) {
    return <div>No data!</div>;
  }
  return (
    <div>
      <Divider />
      {users?.map((user) => (
        <UserListItem
          key={`ulst-${user.id}`}
          {...user}
          user={user}
          isDeleting={isDeleting}
          deleteAction={(id, title) => {
            dispatch(
              openDialog({
                text: t<string>("text.delete", { item: title }),
                id,
              })
            );
          }}
        />
      ))}
      <DialogConfirm
        open={isOpen}
        onClose={handleClose}
        title={t<string>("title.attention")}
        text={options?.text || ""}
      />
    </div>
  );
};

export default UsersList;
