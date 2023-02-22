import React, { useCallback, useEffect, useMemo } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { FORMAT_TEXT_COMMAND } from "lexical";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import CodeIcon from "@mui/icons-material/Code";

import { RTEditorFormatTextType } from "./types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const RTEditorButtonsFormatTextGroup: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [textFormats, setTextFormats] = React.useState<
    RTEditorFormatTextType[]
  >(() => []);

  const handleTextFormats = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: RTEditorFormatTextType[]
  ) => {
    setTextFormats(newFormats);
  };

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, type: RTEditorFormatTextType) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
    },
    [editor]
  );

  const buttons = useMemo<{
    [K in RTEditorFormatTextType]: React.ElementType;
  }>(
    () => ({
      bold: FormatBoldIcon,
      italic: FormatItalicIcon,
      underline: FormatUnderlinedIcon,
      strikethrough: FormatStrikethroughIcon,
      code: CodeIcon,
    }),
    []
  );

  const formats = useMemo<RTEditorFormatTextType[]>(
    () => ["bold", "italic", "underline", "strikethrough", "code"],
    []
  );
  const updateButtons = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const newFormats = formats.filter((format) =>
        selection.hasFormat(format)
      );
      setTextFormats(newFormats);
    }
  }, [formats]);

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
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateButtons]);

  return (
    <ToggleButtonGroup
      value={textFormats}
      onChange={handleTextFormats}
      size="small"
    >
      {Object.entries(buttons).map(([type, Icon]) => (
        <ToggleButton
          value={type}
          key={`itm-redit-frm-btn-${type}`}
          onClick={handleButtonClick}
        >
          <Icon />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default RTEditorButtonsFormatTextGroup;
