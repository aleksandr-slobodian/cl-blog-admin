import { useMemo } from "react";
import FormUser from "../../components/form-user/FormUser";
import PageContent from "../../components/page-content/PageContent";
import { User } from "../../types/api";
import ToolbarTop from "./components/ToolbarTop";

export const PageUserCreate = () => {
  const initValues = useMemo<User>(
    () => ({
      id: "",
      name: "",
      email: "",
      password: "",
      isAdmin: true,
    }),
    []
  );

  return (
    <PageContent>
      <ToolbarTop />
      <FormUser values={initValues} />
    </PageContent>
  );
};

export default PageUserCreate;
