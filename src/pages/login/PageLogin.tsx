import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import FormLogin from "../../components/form-login/FormLogin";
import PageContent from "../../components/page-content/PageContent";

export const PageLogin = () => {
  const { t } = useTranslation("main", { keyPrefix: "page.login" });
  return (
    <PageContent
      sx={{ alignItems: "center", justifyContent: "center", flexGrow: 0.5 }}
    >
      <Typography variant="h1">{t("h1")}</Typography>
      <FormLogin />
    </PageContent>
  );
};

export default PageLogin;
