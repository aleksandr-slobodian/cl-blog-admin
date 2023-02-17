import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import { useMemo } from "react";

export const RTEditorPlaceholder: React.FC<{ text: string }> = ({ text }) => {
  const placeholderStyles = useMemo<SxProps<Theme>>(
    () => (theme) => ({
      color: "text.disabled",
      overflow: "hidden",
      position: "absolute",
      textOverflow: "ellipsis",
      top: theme.spacing(2),
      left: theme.spacing(1.5),
      userSelect: "none",
      display: "inline-block",
      pointerEvents: "none",
    }),
    []
  );
  return <Box sx={placeholderStyles}>{text}</Box>;
};

export default RTEditorPlaceholder;
