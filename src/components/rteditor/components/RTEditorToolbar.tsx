import Stack from "@mui/material/Stack";
import React from "react";

import RTEditorButtonRedo from "./button-redo/RTEditorButtonRedo";
import RTEditorButtonUndo from "./button-undo/RTEditorButtonUndo";
import RTEditorButtonsFormatText from "./buttons-format-text/RTEditorButtonsFormatText";

export const RTEditorToolbar: React.FC = () => {
  return (
    <Stack flexDirection="row">
      <RTEditorButtonUndo />
      <RTEditorButtonRedo />
      <RTEditorButtonsFormatText />
    </Stack>
  );
};

export default RTEditorToolbar;
