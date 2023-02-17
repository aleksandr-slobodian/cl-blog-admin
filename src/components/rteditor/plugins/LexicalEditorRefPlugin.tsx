import { LexicalEditor } from "lexical/LexicalEditor";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { forwardRef, useImperativeHandle } from "react";

export interface LexicalEditorRefPluginHandle {
  getEditor: () => LexicalEditor;
}
export const LexicalEditorRefPlugin = forwardRef<LexicalEditorRefPluginHandle>(
  (_, ref) => {
    const [editor] = useLexicalComposerContext();
    useImperativeHandle(
      ref,
      () => ({
        getEditor() {
          return editor;
        },
      }),
      [editor]
    );
    return null;
  }
);

export default LexicalEditorRefPlugin;
