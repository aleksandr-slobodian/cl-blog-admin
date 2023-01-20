import React, { SyntheticEvent, useState } from "react";
import PageContent from "../../components/page-content/PageContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../components/images-uploader/ImagesUploader";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ImagesList from "../../components/images-list/ImagesList";

export const PageImages: React.FC = () => {
  const { t } = useTranslation("main", { keyPrefix: "page.images" });
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <PageContent>
        <Typography variant="h1">{t("h1")}</Typography>
      </PageContent>
      <PageContent isTop={false} sx={{ mt: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label={t("tab-1")} value="1" />
              <Tab label={t("tab-2")} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <ImagesUploader />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <ImagesList />
          </TabPanel>
        </TabContext>
      </PageContent>
    </>
  );
};

export default PageImages;
