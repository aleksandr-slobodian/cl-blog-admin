import React from "react";
import { useTranslation } from "react-i18next";
import { PostListItem } from "./PostListItem";
import { Post } from "../../types/api";
import { useDeletePostMutation } from "../../services/posts";
import DialogConfirm from "../dialog-confirm/DialogConfirm";
import Stack from "@mui/material/Stack";
import { useDialogConfirm } from "../../hooks/dialog-confirm";
import { useMutationsSnackbar } from "../../hooks/snackbar";

interface PostsListProps {
  data?: Post[];
}

export const PostsList: React.FC<PostsListProps> = ({ data }) => {
  const [deletePost, { isLoading: isDeleting, isSuccess, isError }] =
    useDeletePostMutation();

  const { isOpen, dialogData, handleOpenDialog, handleCloseDialog } =
    useDialogConfirm(
      "delete-post-dialog",
      "dialog.misc.text.delete",
      deletePost
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

  if (!data?.length) {
    return <div>No data!</div>;
  }

  return (
    <div>
      <Stack sx={{ flexWrap: "wrap", flexDirection: "row", gap: 3 }}>
        {data?.map((post) => (
          <PostListItem
            key={`ulst-${post.id}`}
            post={post}
            isDeleting={dialogData?.id === post.id && isDeleting}
            deleteAction={handleOpenDialog}
          />
        ))}
      </Stack>
      <DialogConfirm
        open={isOpen}
        onClose={handleCloseDialog}
        title={t<string>("title.attention")}
        text={dialogData?.text || ""}
      />
    </div>
  );
};

export default PostsList;
