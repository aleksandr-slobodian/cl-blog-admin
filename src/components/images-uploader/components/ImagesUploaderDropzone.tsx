import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import React, { useCallback, useMemo } from "react";
import {
  DropzoneOptions,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { KeyValue } from "../../../types";

interface ImagesUploaderDropzoneProps {
  maxDropFiles?: number;
  maxFileSize?: number;
  maxFileName?: number;
  onDropFiles?: (files: File[]) => void;
}

export const ImagesUploaderDropzone: React.FC<ImagesUploaderDropzoneProps> = ({
  maxDropFiles = 10,
  maxFileSize = 1000000,
  maxFileName = 100,
  onDropFiles,
}) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });
  const { enqueueSnackbar } = useSnackbar();

  const validator = useCallback(
    (file: File) => {
      if (file.size > maxFileSize) {
        return {
          code: "size-too-large",
          message: t("error.max-file-size", { number: maxFileSize / 1000 }),
        } as FileError;
      }
      if (file.name.split(".")[0].length > maxFileName) {
        return {
          code: "name-too-large",
          message: t("error.max-file-name", { number: maxFileName }),
        };
      }
      return null;
    },
    [maxFileName, maxFileSize, t]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onDropFiles) {
        onDropFiles(acceptedFiles);
      }
    },
    [onDropFiles]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      if (fileRejections.length > maxDropFiles) {
        enqueueSnackbar(t("error.max-files-number", { number: maxDropFiles }), {
          variant: "error",
        });
      } else {
        const causes: KeyValue = {};
        fileRejections.forEach((file) => {
          file.errors.forEach(({ code, message }) => {
            if (!causes[code]) {
              causes[code] = message;
            }
          });
        });
        enqueueSnackbar(
          `${t("error.files-rejected", {
            number: fileRejections.length,
          })} (${Object.values(causes).join(", ")})`,
          {
            variant: "error",
          }
        );
      }
    },
    [enqueueSnackbar, maxDropFiles, t]
  );

  const dropzoneOptions = useMemo<DropzoneOptions>(
    () => ({
      validator,
      onDropRejected,
      onDrop,
      accept: {
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/webp": [".webp"],
      },
      maxFiles: maxDropFiles,
    }),
    [maxDropFiles, onDrop, onDropRejected, validator]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const dropzoneStyles = useMemo<SxProps<Theme>>(
    () =>
      ({ palette }) => {
        return {
          cursor: "pointer",
          padding: 3,
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: !isDragActive
            ? palette.primary.light
            : palette.success.light,
        };
      },
    [isDragActive]
  );

  return (
    <Box {...getRootProps()} sx={dropzoneStyles}>
      <input {...getInputProps()} />
      <Typography variant="body1" pb={1}>
        {t(
          isDragActive
            ? "label.dropzone-drop-here"
            : "label.dropzone-drop-or-select"
        )}
      </Typography>
      <Typography variant="caption">
        {t("label.dropzone-caption", { number: maxDropFiles })}
      </Typography>
    </Box>
  );
};

export default ImagesUploaderDropzone;
