import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  DropzoneOptions,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import AvatarEditorCore from "react-avatar-editor";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ImageIcon from "@mui/icons-material/Image";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { KeyValue } from "../../types";
import { useSnackbar } from "notistack";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";

export type AvatarEditorHandle = {
  getCanvas?: () => HTMLCanvasElement | undefined;
};

interface AvatarEditorProps {
  width?: number;
  height?: number;
  maxFileSize?: number;
  maxFileName?: number;
}

export const AvatarEditor = forwardRef<AvatarEditorHandle, AvatarEditorProps>(
  (
    { width = 240, height = 240, maxFileSize = 1000000, maxFileName = 100 },
    ref
  ) => {
    const { t } = useTranslation("main", { keyPrefix: "form" });

    const [image, setImage] = useState<File>();

    const editor = createRef<AvatarEditorCore>();

    useImperativeHandle(
      ref,
      () => ({
        getCanvas() {
          if (image && editor.current) {
            return editor.current.getImageScaledToCanvas();
          }
          return undefined;
        },
      }),
      [editor, image]
    );

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

    const { enqueueSnackbar } = useSnackbar();

    const onDropRejected = useCallback(
      (fileRejections: FileRejection[]) => {
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
      },
      [enqueueSnackbar, t]
    );

    const handleDrop = useCallback((dropped: File[]) => {
      setImage(dropped[0]);
    }, []);

    const dropzoneOptions = useMemo<DropzoneOptions>(
      () => ({
        validator,
        onDropRejected,
        accept: {
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
          "image/webp": [".webp"],
        },
        maxFiles: 1,
        noKeyboard: true,
        noClick: !!image,
        onDrop: handleDrop,
      }),
      [handleDrop, image, onDropRejected, validator]
    );

    const { getRootProps, isDragActive, open, getInputProps } =
      useDropzone(dropzoneOptions);

    const dropzoneStyles = useMemo<SxProps<Theme>>(
      () =>
        ({ palette }) => {
          return {
            overflow: "hidden",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 0,
            width: width + 44,
            height: width + 44,
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: !isDragActive
              ? palette.primary.light
              : palette.success.light,
          };
        },
      [isDragActive, width]
    );

    const editButtonStyles = useMemo<SxProps>(
      () => ({
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 10,
        color: "white",
      }),
      []
    );

    const [scale, setScale] = useState<number>(1);
    const handleChangeScale = useCallback(
      (event: Event, value: number | number[]) => {
        setScale(value as number);
      },
      []
    );

    const [rotate, setRotete] = useState(0);
    const handleRotateLeft = useCallback(() => {
      setRotete((value) => (value - 90) % 360);
    }, []);
    const handleRotateRight = useCallback(() => {
      setRotete((value) => (value + 90) % 360);
    }, []);

    const handleImageReady = useCallback(() => {
      setScale(1);
      setRotete(0);
    }, []);

    return (
      <Stack gap={2} width="fit-content">
        <Box {...getRootProps()} sx={dropzoneStyles}>
          <input {...getInputProps()} />
          {!!image ? (
            <Box>
              <IconButton
                size="small"
                sx={editButtonStyles}
                onClick={open}
                title={t<string>("label.dropzone-drop-or-select-one")}
              >
                <ImageIcon />
              </IconButton>
              <AvatarEditorCore
                rotate={rotate}
                scale={scale}
                borderRadius={120}
                border={20}
                width={width}
                height={height}
                image={image || ""}
                ref={editor}
                onImageReady={handleImageReady}
              />
            </Box>
          ) : (
            <Box p={3} textAlign="center">
              <AccountCircleIcon fontSize="large" />
              <Typography variant="body2" pt={1}>
                {t(
                  isDragActive
                    ? "label.dropzone-drop-here-one"
                    : "label.dropzone-drop-or-select-one"
                )}
              </Typography>
            </Box>
          )}
        </Box>
        {!!image ? (
          <Stack flexDirection="row" gap={2} alignItems="center">
            <IconButton onClick={handleRotateLeft} edge="start">
              <RotateLeftIcon />
            </IconButton>
            <Slider
              value={scale}
              min={1}
              max={2}
              step={0.01}
              aria-label="Default"
              valueLabelDisplay="off"
              onChange={handleChangeScale}
            />
            <IconButton onClick={handleRotateRight} edge="end">
              <RotateRightIcon />
            </IconButton>
          </Stack>
        ) : null}
      </Stack>
    );
  }
);

export default AvatarEditor;
