import dayjs from "dayjs";
import { useMemo } from "react";
import FormPost from "../../components/form-post/FormPost";
import PageContent from "../../components/page-content/PageContent";
import { Post } from "../../types/api";
import ToolbarTop from "./components/ToolbarTop";

export const PagePostCreate = () => {
  const initValues = useMemo<Post>(
    () => ({
      id: "",
      title: "",
      subtitle: "",
      body: "",
      alias: "",
      image: "",
      datePublished: dayjs(),
      isPublished: true,
    }),
    []
  );

  return (
    <PageContent>
      <ToolbarTop />
      <FormPost values={initValues} />
    </PageContent>
  );
};

export default PagePostCreate;
