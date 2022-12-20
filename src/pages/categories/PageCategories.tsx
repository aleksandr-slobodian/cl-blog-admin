import React from "react";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";
import { CategoriesList } from "./components/CategoriesList";
import { useListCategoriesQuery } from "../../services/categories";

export const PageUsers: React.FC = () => {
  const { data, error, isLoading } = useListCategoriesQuery();

  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  return (
    <>
      <PageContent>
        <ToolbarTop />
      </PageContent>
      <PageContent disableGutters={true} isTop={false} sx={{ mt: 2 }}>
        <CategoriesList data={data} />
      </PageContent>
    </>
  );
};

export default PageUsers;
