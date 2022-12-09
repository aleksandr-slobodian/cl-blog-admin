import { Stack } from "@mui/material";
import React, { useState } from "react";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { Pager } from "../../components/pager/Pager";

import { useListUsersQuery } from "../../services/users";

import { PageDefault } from "../default";
import UsersList from "./components/UsersList";

export const PageUsers: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useListUsersQuery(page);

  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  return (
    <Stack gap={3}>
      <UsersList users={data} />
      <Pager
        count={data?.length}
        page={page}
        isFetching={isFetching}
        setPage={(page) => setPage(page)}
      />
    </Stack>
  );
};

export default PageUsers;
