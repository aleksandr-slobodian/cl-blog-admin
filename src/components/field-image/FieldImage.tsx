import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";

interface FieldImageProps {
  onIconClick?: () => void;
}

export const FieldImage: React.FC<FieldImageProps & TextFieldProps> = ({
  onIconClick,
  ...props
}) => {
  return (
    <TextField
      {...props}
      type="text"
      size="small"
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              onIconClick && onIconClick();
            }}
            edge="end"
          >
            <ImageIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default FieldImage;
