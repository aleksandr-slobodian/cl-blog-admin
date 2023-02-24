import { $isRootOrShadowRoot } from "lexical";
import { LexicalEditor } from "lexical/LexicalEditor";
import { RangeSelection } from "lexical/LexicalSelection";
import { $findMatchingParent } from "@lexical/utils";
type EditorSelection = RangeSelection | null;
export function getSelectedElement(
  selection: EditorSelection,
  editor: LexicalEditor
) {
  if (!selection) return { elementDOM: null, element: null, anchorNode: null };
  const anchorNode = selection.anchor.getNode();
  let element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : $findMatchingParent(anchorNode, (e) => {
          const parent = e.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (element === null) {
    element = anchorNode.getTopLevelElementOrThrow();
  }
  const elementKey = element.getKey();
  const elementDOM = editor.getElementByKey(elementKey);
  return { elementDOM, element, anchorNode };
}
