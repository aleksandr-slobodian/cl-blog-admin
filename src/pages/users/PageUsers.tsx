import React, { useState } from "react";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { Pager } from "../../components/pager/Pager";

import { useListUsersQuery } from "../../services/users";

import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";
import UsersList from "./components/UsersList";

export const PageUsers: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useListUsersQuery({
    _page: page.toString(),
  });

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
        <UsersList users={data} />
      </PageContent>
      <PageContent isTop={false} sx={{ mt: 2 }}>
        <Pager
          count={data?.length}
          page={page}
          isFetching={isFetching}
          setPage={(page) => setPage(page)}
        />
      </PageContent>
    </>
  );
};

export default PageUsers;
