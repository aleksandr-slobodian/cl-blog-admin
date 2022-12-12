import Stack from "@mui/system/Stack";
import { useMemo } from "react";
import FormUser from "../../components/form-user/FormUser";
import { User } from "../../types/api";
import ToolbarTop from "./components/ToolbarTop";

export const PageUserCreate = () => {
  const initValues = useMemo<User>(
    () => ({
      id: "",
      name: "",
    }),
    []
  );

  return (
    <Stack gap={3}>
      <ToolbarTop />
      <FormUser values={initValues} />
    </Stack>
  );
};

export default PageUserCreate;
