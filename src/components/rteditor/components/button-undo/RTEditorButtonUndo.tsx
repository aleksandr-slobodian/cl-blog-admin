import React, { useCallback, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import UndoIcon from "@mui/icons-material/Undo";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CAN_UNDO_COMMAND, UNDO_COMMAND } from "lexical";

export const RTEditorButtonUndo: React.FC<{ title?: string }> = ({ title }) => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    return editor.registerCommand<boolean>(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const handleClick = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  return (
    <IconButton
      title={title}
      disabled={!canUndo}
      sx={{ borderRadius: 1 }}
      onClick={handleClick}
    >
      <UndoIcon />
    </IconButton>
  );
};

export default RTEditorButtonUndo;
