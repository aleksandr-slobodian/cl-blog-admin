import editorTheme from "./editorTheme";

export const editorConfig = {
  namespace: "RTEditor",
  theme: editorTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [],
};

export default editorConfig;
