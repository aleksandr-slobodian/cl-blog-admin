import { useParams } from "react-router-dom";
import FormCategory from "../../components/form-category/FormCategory";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { useGetCategoryQuery } from "../../services/categories";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";

export const PageCategoryUpdate = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetCategoryQuery(id as string);

  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (!data) {
    return null;
  }

  return (
    <PageContent>
      <ToolbarTop />
      <FormCategory values={data} />
    </PageContent>
  );
};

export default PageCategoryUpdate;
