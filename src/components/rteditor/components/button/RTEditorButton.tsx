import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const RTEditorButton = styled(Button)(
  ({ theme, startIcon, endIcon }) => ({
    textTransform: "capitalize",
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    paddingLeft: startIcon || endIcon ? theme.spacing(2) : theme.spacing(1),
    paddingRight: startIcon || endIcon ? theme.spacing(2) : theme.spacing(1),
    "&:hover": {
      borderColor: `${theme.palette.divider} !important`,
    },
  })
);

export default RTEditorButton;
