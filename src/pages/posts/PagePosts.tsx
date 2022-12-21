import React, { useMemo } from "react";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";
import { PostsList } from "./components/PostsList";
import { useListPostsQuery } from "../../services/posts";
import { Pager } from "../../components/pager/Pager";
import { useSearchParams } from "react-router-dom";

export const PagePosts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(() => {
    const cp = searchParams.get("page");
    return cp ? parseInt(cp) : 1;
  }, [searchParams]);

  const { data, error, isLoading, isFetching } = useListPostsQuery(page);

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
        <PostsList data={data} />
      </PageContent>
      <PageContent isTop={false} sx={{ mt: 2 }}>
        <Pager
          count={data?.length}
          page={page}
          isFetching={isFetching}
          setPage={(page) => setSearchParams({ page: page.toString() })}
        />
      </PageContent>
    </>
  );
};

export default PagePosts;
