import Stack from "@mui/material/Stack";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import RTEditorButtonFormatText from "./RTEditorButtonFormatText";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import CodeIcon from "@mui/icons-material/Code";

import { RTEditorFormatTextType } from "./type";

export const RTEditorButtonsFormatText: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateButtons = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

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

  const buttons = useMemo<{
    [K in RTEditorFormatTextType]: [boolean, React.ElementType];
  }>(
    () => ({
      bold: [isBold, FormatBoldIcon],
      italic: [isItalic, FormatItalicIcon],
      underline: [isUnderline, FormatUnderlinedIcon],
      strikethrough: [isStrikethrough, FormatStrikethroughIcon],
      code: [isCode, CodeIcon],
    }),
    [isBold, isCode, isItalic, isStrikethrough, isUnderline]
  );

  return (
    <Stack flexDirection="row">
      {Object.entries(buttons).map(([type, [status, Icon]]) => (
        <RTEditorButtonFormatText
          key={`itm-redit-frm-btn-${type}`}
          type={type as RTEditorFormatTextType}
          isActive={status}
        >
          <Icon />
        </RTEditorButtonFormatText>
      ))}
    </Stack>
  );
};

export default RTEditorButtonsFormatText;
