import React, { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { RTEditorFormatTextType } from "./type";

export const RTEditorButtonFormatText: React.FC<{
  type: RTEditorFormatTextType;
  title?: string;
  isActive?: boolean;
  children: React.ReactNode;
}> = ({ title, isActive = false, children, type }) => {
  const [editor] = useLexicalComposerContext();

  const handleClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  }, [editor, type]);

  return (
    <IconButton
      color={isActive ? "secondary" : "default"}
      title={title}
      sx={{ borderRadius: 1 }}
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
};

export default RTEditorButtonFormatText;
