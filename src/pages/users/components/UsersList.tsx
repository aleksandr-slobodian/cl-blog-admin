import Divider from "@mui/material/Divider";
import React from "react";
import { useDeleteUserMutation } from "../../../services/users";
import { User } from "../../../types/api";
import { UserListItem } from "./UserListItem";

interface UsersListProps {
  users?: User[];
}

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
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
          deleteAction={(id) => deleteUser(id)}
        />
      ))}
    </div>
  );
};

export default UsersList;
