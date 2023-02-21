import React, { useCallback, useEffect, useMemo } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import { RTEditorFormatAlignType } from "./types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { getSelectedDomElement } from "../../utils";

export const RTEditorButtonsFormatAlignGroup: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [textFormats, setTextFormats] =
    React.useState<RTEditorFormatAlignType>("left");

  const handleTextFormats = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: RTEditorFormatAlignType
  ) => {
    setTextFormats(newFormats);
  };

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, type: RTEditorFormatAlignType) => {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, type);
    },
    [editor]
  );

  const buttons = useMemo<{
    [K in RTEditorFormatAlignType]: React.ElementType;
  }>(
    () => ({
      left: FormatAlignLeftIcon,
      center: FormatAlignCenterIcon,
      right: FormatAlignRightIcon,
      justify: FormatAlignJustifyIcon,
    }),
    []
  );

  const updateButtons = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const elementDOM = getSelectedDomElement(selection, editor);
      if (elementDOM !== null) {
        const align = elementDOM.style.textAlign as RTEditorFormatAlignType;
        setTextFormats(align || "left");
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateButtons();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateButtons();
          return true;
        },
        1
      )
    );
  }, [editor, updateButtons]);

  return (
    <ToggleButtonGroup
      value={textFormats}
      onChange={handleTextFormats}
      size="small"
      exclusive
    >
      {Object.entries(buttons).map(([type, Icon]) => (
        <ToggleButton
          value={type}
          key={`itm-redit-frm-alg-btn-${type}`}
          onClick={handleButtonClick}
        >
          <Icon />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default RTEditorButtonsFormatAlignGroup;
