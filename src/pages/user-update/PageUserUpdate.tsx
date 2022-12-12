import Stack from "@mui/system/Stack";
import { useParams } from "react-router-dom";
import FormUser from "../../components/form-user/FormUser";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import { useGetUserQuery } from "../../services/users";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";

export const PageUserUpdate = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetUserQuery(id as string);

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
    <Stack gap={3}>
      <ToolbarTop />
      <FormUser values={data} />
    </Stack>
  );
};

export default PageUserUpdate;
