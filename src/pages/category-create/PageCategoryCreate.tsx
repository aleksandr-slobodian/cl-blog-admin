import { useMemo } from "react";
import FormCategory from "../../components/form-category/FormCategory";
import PageContent from "../../components/page-content/PageContent";
import { Category } from "../../types/api";
import ToolbarTop from "./components/ToolbarTop";

export const PageCategoryCreate = () => {
  const initValues = useMemo<Category>(
    () => ({
      id: "",
      title: "",
      alias: "",
      isPublished: true,
    }),
    []
  );

  return (
    <PageContent>
      <ToolbarTop />
      <FormCategory values={initValues} />
    </PageContent>
  );
};

export default PageCategoryCreate;
