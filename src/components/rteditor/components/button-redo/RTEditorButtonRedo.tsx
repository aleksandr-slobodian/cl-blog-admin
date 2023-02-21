import React, { useCallback, useEffect, useState } from "react";
import RedoIcon from "@mui/icons-material/Redo";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CAN_REDO_COMMAND, REDO_COMMAND } from "lexical";
import RTEditorButton from "../button/RTEditorButton";

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
    <RTEditorButton title={title} disabled={!canRedo} onClick={handleClick}>
      <RedoIcon />
    </RTEditorButton>
  );
};

export default RTEditorButtonRedo;
