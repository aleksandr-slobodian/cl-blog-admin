import React, { useCallback, useRef } from "react";
import { useAddAvatarMutation } from "../../services/avatars";
import AvatarEditor, {
  AvatarEditorHandle,
} from "../avatar-editor/AvatarEditor";
import { v4 as uuid } from "uuid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar } from "../../types/api";

interface UserAvatarsUploaderProps {
  userId: string;
  onUploadSuccess?: (data: Avatar) => void;
}

export const UserAvatarsUploader: React.FC<UserAvatarsUploaderProps> = ({
  userId,
  onUploadSuccess,
}) => {
  const editorRef = useRef<AvatarEditorHandle>(null);

  const { t } = useTranslation("main", { keyPrefix: "form" });
  const { enqueueSnackbar } = useSnackbar();

  const [addAvatar, { isLoading }] = useAddAvatarMutation();

  const handleClear = useCallback(
    () => editorRef.current?.clear && editorRef.current.clear(),
    []
  );

  const handleUpload = useCallback(() => {
    const { getFile, getCanvas } = editorRef.current || {};
    if (getCanvas) {
      const canvas = getCanvas();
      if (!canvas) {
        enqueueSnackbar(t("error.select-file-first"), {
          variant: "warning",
        });
        return;
      }
      canvas.toBlob(async (file) => {
        if (!file) {
          return;
        }
        const imageFile = getFile && getFile();
        const id = uuid();
        const formData = new FormData();
        formData.set("id", id);
        formData.set("userId", userId);
        formData.set("file", file, imageFile?.name);
        try {
          const avatar = await addAvatar(formData).unwrap();
          handleClear();
          if (onUploadSuccess && avatar) {
            onUploadSuccess(avatar);
          }
          enqueueSnackbar(t("success.upload"), {
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar(t("error.upload"), {
            variant: "error",
          });
        }
      });
    }
  }, [addAvatar, enqueueSnackbar, handleClear, onUploadSuccess, t, userId]);

  return (
    <Stack gap={2} width="fit-content">
      <AvatarEditor ref={editorRef} />
      <Stack flexDirection="row" gap={2}>
        <LoadingButton
          loading={isLoading}
          color="primary"
          variant="contained"
          type="button"
          onClick={handleUpload}
        >
          {t("button.upload")}
        </LoadingButton>
        <Button variant="outlined" onClick={handleClear}>
          {t("button.clear")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserAvatarsUploader;
