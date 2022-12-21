import React from "react";
import PageContent from "../../components/page-content/PageContent";
import Typography from "@mui/material/Typography";
import PostsList from "../posts/components/PostsList";
import { useListPostsQuery } from "../../services/posts";
import { PageDefault } from "../default";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { APP_PATH_POSTS } from "../../config";

export const PageHome: React.FC = () => {
  const { data, error, isLoading } = useListPostsQuery();
  const { t } = useTranslation("main", { keyPrefix: "page.home" });
  const navigate = useNavigate();
  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  return (
    <>
      <PageContent>
        <Typography variant="h1">{t("h1")}</Typography>
      </PageContent>
      <PageContent disableGutters={true} isTop={false} sx={{ mt: 2 }}>
        <PostsList data={data} />
      </PageContent>
      <PageContent disableGutters={true} isTop={false} sx={{ mt: 3 }}>
        <Button
          sx={{ alignSelf: "center" }}
          variant="outlined"
          onClick={() => navigate(APP_PATH_POSTS)}
        >
          {t("button.more-posts")}
        </Button>
      </PageContent>
    </>
  );
};

export default PageHome;
