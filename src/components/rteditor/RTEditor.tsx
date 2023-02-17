import { forwardRef, useImperativeHandle, useRef } from "react";
import editorConfig from "./editorConfig";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Box from "@mui/material/Box";
import useEditorStyles from "./useEditorStyles";
import LexicalEditorRefPlugin, {
  LexicalEditorRefPluginHandle,
} from "./plugins/LexicalEditorRefPlugin";
import RTEditorPlaceholder from "./components/RTEditorPlaceholder";

interface RTEditorProps {
  placeholder?: string;
  autoFocus?: boolean;
}
export interface RTEditorHandle {
  focus?: () => void;
}

export const RTEditor = forwardRef<RTEditorHandle, RTEditorProps>(
  ({ placeholder, autoFocus = false }, ref) => {
    const editorRef = useRef<LexicalEditorRefPluginHandle>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          const editor = editorRef?.current?.getEditor();
          if (editor) {
            editor.focus();
          }
        },
      }),
      []
    );

    const { editorInnerStyles } = useEditorStyles();

    return (
      <LexicalComposer initialConfig={editorConfig}>
        <Box className="editor-container">
          <Box sx={editorInnerStyles}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<RTEditorPlaceholder text={placeholder || ""} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            {autoFocus ? <AutoFocusPlugin /> : null}
            <LexicalEditorRefPlugin ref={editorRef} />
          </Box>
        </Box>
      </LexicalComposer>
    );
  }
);

export default RTEditor;
