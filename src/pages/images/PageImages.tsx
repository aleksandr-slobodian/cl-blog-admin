import React from "react";
import PageContent from "../../components/page-content/PageContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../components/images-uploader/ImagesUploader";

export const PageImages: React.FC = () => {
  const { t } = useTranslation("main", { keyPrefix: "page.images" });

  return (
    <>
      <PageContent>
        <Typography variant="h1">{t("h1")}</Typography>
      </PageContent>
      <PageContent isTop={false} sx={{ mt: 3 }}>
        <ImagesUploader />
      </PageContent>
    </>
  );
};

export default PageImages;
