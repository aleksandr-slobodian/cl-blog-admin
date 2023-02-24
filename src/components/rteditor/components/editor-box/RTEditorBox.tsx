import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const RTEditorBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  "& .editor-input": {
    minHeight: 150,
    resize: "none",
    caretColor: theme.palette.text.primary,
    position: "relative",
    tabSize: 1,
    outline: 0,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  "& .editor-paragraph": {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  "& .editor-text-bold": {
    fontWeight: "bold",
  },
  "& .editor-text-italic": {
    fontStyle: "italic",
  },
  "& .editor-text-underline": {
    textDecoration: "underline",
  },
  "& .editor-text-strikethrough": {
    textDecoration: "line-through",
  },
  "& .editor-text-underlineStrikethrough": {
    textDecoration: "underline line-through",
  },
  "& .editor-text-code": {
    background: theme.palette.divider,
    padding: "1px 0.25rem",
    fontFamily: "Menlo, Consolas, Monaco, monospace",
    fontSize: "94%",
  },
  "& .editor-quote": {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    borderLeftColor: theme.palette.divider,
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    paddingLeft: theme.spacing(2),
  },
}));

export default RTEditorBox;
