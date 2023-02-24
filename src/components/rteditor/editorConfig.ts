import editorTheme from "./editorTheme";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";

export const editorConfig = {
  namespace: "RTEditor",
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
};

export default editorConfig;
