import dayjs from "dayjs";
import { useMemo } from "react";
import FormPost from "../../components/form-post/FormPost";
import PageContent from "../../components/page-content/PageContent";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../state/auth";
import { Post } from "../../types/api";
import ToolbarTop from "./components/ToolbarTop";

export const PagePostCreate = () => {
  const { user } = useAppSelector(selectAuth);

  const initValues = useMemo<Post>(
    () => ({
      id: "",
      title: "",
      subtitle: "",
      body: "",
      alias: "",
      image: "",
      datePublished: dayjs(new Date()) as unknown as number,
      isPublished: true,
      userId: user?.id || "",
      user: user || undefined,
    }),
    [user]
  );

  return (
    <PageContent>
      <ToolbarTop />
      <FormPost values={initValues} />
    </PageContent>
  );
};

export default PagePostCreate;
