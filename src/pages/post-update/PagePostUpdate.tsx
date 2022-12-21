import { useParams } from "react-router-dom";
import FormPost from "../../components/form-post/FormPost";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { useGetPostQuery } from "../../services/posts";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";

export const PagePostUpdate = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPostQuery(id as string);

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
      <FormPost values={data} />
    </PageContent>
  );
};

export default PagePostUpdate;
