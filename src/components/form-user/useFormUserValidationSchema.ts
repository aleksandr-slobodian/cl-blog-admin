import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const FORM_V_NAME_MIN = 1;
const FORM_V_NAME_MAX = 100;

export const useFormUserValidationSchema = () => {
  const { t } = useTranslation("main", {
    keyPrefix: "form.validation",
  });

  return useMemo(
    () =>
      yup.object({
        name: yup
          .string()
          .min(FORM_V_NAME_MIN, t<string>("min", { min: FORM_V_NAME_MIN }))
          .max(FORM_V_NAME_MAX, t<string>("max", { max: FORM_V_NAME_MAX }))
          .required(t<string>("required")),
      }),
    [t]
  );
};

export default useFormUserValidationSchema;
