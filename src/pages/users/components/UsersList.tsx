import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import DialogConfirm from "../../../components/dialog-confirm/DialogConfirm";
import { useDeleteUserMutation } from "../../../services/users";
import { User } from "../../../types/api";
import { UserListItem } from "./UserListItem";
import { useDialogConfirm } from "../../../hooks/dialog-confirm";
import { useMutationsSnackbar } from "../../../hooks/snackbar";

interface UsersListProps {
  users?: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const [deleteUser, { isLoading: isDeleting, isSuccess, isError }] =
    useDeleteUserMutation();

  const { isOpen, dialogData, handleOpenDialog, handleCloseDialog } =
    useDialogConfirm(
      "delete-user-dialog",
      "dialog.misc.text.delete",
      deleteUser
    );

  useMutationsSnackbar(
    isSuccess,
    isError,
    "form.success.delete",
    "form.error.delete"
  );

  const { t } = useTranslation("main", {
    keyPrefix: "dialog.misc",
  });

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
          isDeleting={dialogData?.id === user.id && isDeleting}
          deleteAction={handleOpenDialog}
        />
      ))}
      <DialogConfirm
        open={isOpen}
        onClose={handleCloseDialog}
        title={t<string>("title.attention")}
        text={dialogData?.text || ""}
      />
    </div>
  );
};

export default UsersList;
