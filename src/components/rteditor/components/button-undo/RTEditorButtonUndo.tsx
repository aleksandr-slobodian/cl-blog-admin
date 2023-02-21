import React, { useCallback, useEffect, useState } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CAN_UNDO_COMMAND, UNDO_COMMAND } from "lexical";
import RTEditorButton from "../button/RTEditorButton";

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
    <RTEditorButton title={title} disabled={!canUndo} onClick={handleClick}>
      <UndoIcon />
    </RTEditorButton>
  );
};

export default RTEditorButtonUndo;
