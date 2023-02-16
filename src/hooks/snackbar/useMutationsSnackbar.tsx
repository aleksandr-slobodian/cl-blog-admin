import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useMutationsSnackbar(
  isSuccess: boolean,
  isError: boolean,
  successAlias: string,
  errorAlias: string,
  translationNS = "main"
) {
  const { t } = useTranslation(translationNS);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(t(successAlias), {
        variant: "success",
      });
      return;
    }
    if (isError) {
      enqueueSnackbar(t(errorAlias), {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, errorAlias, isError, isSuccess, successAlias, t]);
}

export default useMutationsSnackbar;
