import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const RTEditorButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
  "&:hover": {
    borderColor: `${theme.palette.divider} !important`,
  },
}));

export default RTEditorButton;
