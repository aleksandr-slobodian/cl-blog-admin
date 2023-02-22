import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const PlaceholderBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.disabled,
  overflow: "hidden",
  position: "absolute",
  textOverflow: "ellipsis",
  top: theme.spacing(2),
  left: theme.spacing(1.5),
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
}));

export const RTEditorPlaceholder: React.FC<{ text: string }> = ({ text }) => {
  return <PlaceholderBox>{text}</PlaceholderBox>;
};

export default RTEditorPlaceholder;
