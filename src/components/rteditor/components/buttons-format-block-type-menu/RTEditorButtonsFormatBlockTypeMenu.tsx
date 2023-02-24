import React, { useCallback, useEffect, useMemo } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_LOW,
  $createParagraphNode,
} from "lexical";
import { $setBlocksType_experimental } from "@lexical/selection";
import { mergeRegister, $getNearestNodeOfType } from "@lexical/utils";
import {
  $createHeadingNode,
  HeadingTagType,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { RTEditorFormatBlockTypeType } from "./types";
import { getSelectedElement } from "../../utils";
import { RTEditorButtosMenu } from "../buttons-menu/RTEditorButtonsMenu";
import MenuItem from "@mui/material/MenuItem";
import RTEditorButton from "../button/RTEditorButton";
import {
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
} from "../icons/RTEditorIcons";

export const RTEditorButtonsFormatBlockTypeMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [editor] = useLexicalComposerContext();

  const [blockType, setBlockType] =
    React.useState<RTEditorFormatBlockTypeType>("paragraph");

  const formatParagraph = useCallback(() => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType_experimental(selection, () => $createParagraphNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      if (blockType !== headingSize) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType_experimental(selection, () =>
              $createHeadingNode(headingSize)
            );
          }
        });
      }
    },
    [blockType, editor]
  );

  const formatQuote = useCallback(() => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType_experimental(selection, () => $createQuoteNode());
        }
      });
    }
  }, [blockType, editor]);

  const formatBulletList = useCallback(() => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const formatNumberedList = useCallback(() => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const handleButtonClick = useCallback(
    (type: RTEditorFormatBlockTypeType) => {
      switch (type) {
        case "paragraph":
          formatParagraph();
          break;
        case "h2":
          formatHeading("h2");
          break;
        case "h3":
          formatHeading("h3");
          break;
        case "h4":
          formatHeading("h4");
          break;
        case "quote":
          formatQuote();
          break;
        case "ul":
          formatBulletList();
          break;
        case "ol":
          formatNumberedList();
          break;
      }
      setBlockType(type);
      setAnchorEl(null);
    },
    [
      formatBulletList,
      formatHeading,
      formatNumberedList,
      formatParagraph,
      formatQuote,
    ]
  );

  const buttons = useMemo<{
    [K in RTEditorFormatBlockTypeType]: [React.ElementType, string];
  }>(
    () => ({
      paragraph: [FormatAlignLeftIcon, "Normal"],
      h2: [Heading2Icon, "Heading 2"],
      h3: [Heading3Icon, "Heading 3"],
      h4: [Heading4Icon, "Heading 4"],
      ul: [FormatListBulletedIcon, "Bullet list"],
      ol: [FormatListNumberedIcon, "Numbered list"],
      quote: [FormatQuoteIcon, "Quote"],
    }),
    []
  );

  const updateButtons = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const { elementDOM, element, anchorNode } = getSelectedElement(
        selection,
        editor
      );
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type as RTEditorFormatBlockTypeType);
        }
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
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateButtons]);

  const CurrentIcon = buttons[blockType][0];

  return (
    <div>
      <RTEditorButton
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={<CurrentIcon />}
      >
        {buttons[blockType][1]}
      </RTEditorButton>
      <RTEditorButtosMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.entries(buttons).map(([type, [Icon, title]]) => (
          <MenuItem
            onClick={() =>
              handleButtonClick(type as RTEditorFormatBlockTypeType)
            }
            disableRipple
            value={type}
            key={`itm-redit-frm-bltyp-btn-${type}`}
          >
            <Icon />
            {title}
          </MenuItem>
        ))}
      </RTEditorButtosMenu>
    </div>
  );
};

export default RTEditorButtonsFormatBlockTypeMenu;
