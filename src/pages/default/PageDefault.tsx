import Typography from "@mui/material/Typography";
import React from "react";
import PageContent from "../../components/page-content/PageContent";

export const PageDefault: React.FC<{ errorMessage?: string }> = ({
  errorMessage,
}) => {
  return (
    <PageContent>
      <Typography variant="h1">404</Typography>
      {errorMessage ? (
        <Typography variant="body1">{errorMessage}</Typography>
      ) : null}
    </PageContent>
  );
};

export default PageDefault;
