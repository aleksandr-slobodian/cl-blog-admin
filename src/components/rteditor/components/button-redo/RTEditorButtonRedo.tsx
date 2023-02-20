import React, { useCallback, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import RedoIcon from "@mui/icons-material/Redo";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CAN_REDO_COMMAND, REDO_COMMAND } from "lexical";

export const RTEditorButtonRedo: React.FC<{ title?: string }> = ({ title }) => {
  const [editor] = useLexicalComposerContext();
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return editor.registerCommand<boolean>(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const handleClick = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  return (
    <IconButton
      title={title}
      disabled={!canRedo}
      sx={{ borderRadius: 1 }}
      onClick={handleClick}
    >
      <RedoIcon />
    </IconButton>
  );
};

export default RTEditorButtonRedo;
