import { SxProps, Theme } from "@mui/material/styles";
import { useMemo } from "react";

export function useEditorStyles() {
  const editorInnerStyles = useMemo<SxProps<Theme>>(
    () => (theme) => ({
      border: "1px solid",
      borderColor: theme.palette.divider,
      position: "relative",
      "& .editor-input": {
        minHeight: 150,
        resize: "none",
        caretColor: "text.primary",
        position: "relative",
        tabSize: 1,
        outline: 0,
        px: theme.spacing(1.5),
        py: theme.spacing(2),
      },
      "& .editor-paragraph": {
        marginTop: 0,
        "&:last-child": {
          marginBottom: 0,
        },
      },
      "& .editor-text-bold": {
        fontWeight: "bold",
      },
      "& .editor-text-italic": {
        fontStyle: "italic",
      },
      "& .editor-text-underline": {
        textDecoration: "underline",
      },
      "& .editor-text-strikethrough": {
        textDecoration: "line-through",
      },
      "& .editor-text-underlineStrikethrough": {
        textDecoration: "underline line-through",
      },
      "& .editor-text-code": {
        background: theme.palette.divider,
        padding: "1px 0.25rem",
        fontFamily: "Menlo, Consolas, Monaco, monospace",
        fontSize: "94%",
      },
    }),
    []
  );
  return { editorInnerStyles };
}

export default useEditorStyles;
