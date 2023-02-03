import { useParams } from "react-router-dom";
import FormPost from "../../components/form-post/FormPost";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { useFormsPreparedData } from "../../hooks/forms-prepared-data";
import { useGetPostQuery } from "../../services/posts";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";

export const PagePostUpdate = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetPostQuery({
    id: id as string,
    _expand: "user",
  });

  const preparedData = useFormsPreparedData(data, { date: ["datePublished"] });

  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (!preparedData) {
    return null;
  }

  return (
    <PageContent>
      <ToolbarTop />
      <FormPost values={preparedData} />
    </PageContent>
  );
};

export default PagePostUpdate;
