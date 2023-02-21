import { LexicalEditor } from "lexical/LexicalEditor";
import { RangeSelection } from "lexical/LexicalSelection";

type EditorSelection = RangeSelection | null;
export function getSelectedDomElement(
  selection: EditorSelection,
  editor: LexicalEditor
) {
  if (!selection) return null;
  const anchorNode = selection.anchor.getNode();
  const element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow();
  const elementKey = element.getKey();
  const elementDOM = editor.getElementByKey(elementKey);
  return elementDOM;
}
