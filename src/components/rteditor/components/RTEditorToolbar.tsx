import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import React from "react";

import RTEditorButtonRedo from "./button-redo/RTEditorButtonRedo";
import RTEditorButtonUndo from "./button-undo/RTEditorButtonUndo";
import RTEditorButtonsFormatAlignGroup from "./buttons-format-align-group/RTEditorButtonsFormatAlignGroup";
import RTEditorButtonsFormatBlockTypeMenu from "./buttons-format-block-type-menu/RTEditorButtonsFormatBlockTypeMenu";
import RTEditorButtonsFormatTextGroup from "./buttons-format-text-group/RTEditorButtonsFormatTextGroup";

export const RTEditorToolbar: React.FC = () => {
  return (
    <Stack flexDirection="row" gap={1} pb={1} flexWrap="wrap">
      <ButtonGroup variant="outlined" size="small">
        <RTEditorButtonUndo />
        <RTEditorButtonRedo />
      </ButtonGroup>
      <RTEditorButtonsFormatBlockTypeMenu />
      <RTEditorButtonsFormatTextGroup />
      <RTEditorButtonsFormatAlignGroup />
    </Stack>
  );
};

export default RTEditorToolbar;
