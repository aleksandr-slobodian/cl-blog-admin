import Typography from "@mui/material/Typography";
import React from "react";

export const PageDefault: React.FC<{ errorMessage?: string }> = ({
  errorMessage,
}) => {
  return (
    <div>
      <Typography variant="h1">404</Typography>
      {errorMessage ? (
        <Typography variant="body1">{errorMessage}</Typography>
      ) : null}
    </div>
  );
};

export default PageDefault;
