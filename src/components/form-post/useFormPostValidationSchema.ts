import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const FORM_V_TITLE_MIN = 1;
const FORM_V_TITLE_MAX = 50;

const FORM_V_ALIAS_MIN = 3;
const FORM_V_ALIAS_MAX = 20;

export const useFormPostValidationSchema = () => {
  const { t } = useTranslation("main", {
    keyPrefix: "form.validation",
  });

  return useMemo(
    () =>
      yup.object({
        title: yup
          .string()
          .min(FORM_V_TITLE_MIN, t<string>("min", { min: FORM_V_TITLE_MIN }))
          .max(FORM_V_TITLE_MAX, t<string>("max", { max: FORM_V_TITLE_MAX }))
          .required(t<string>("required")),
        alias: yup
          .string()
          .min(FORM_V_ALIAS_MIN, t<string>("min", { min: FORM_V_ALIAS_MIN }))
          .max(FORM_V_ALIAS_MAX, t<string>("max", { max: FORM_V_ALIAS_MAX }))
          .matches(
            /^(?=[a-z0-9-_]*$)(?!.*[<> '"/;`%*()+=[\]{}|\\,.?:^@#~$])/,
            t<string>("alias")
          )
          .required(t<string>("required")),
        datePublished: yup
          .date()
          .typeError(t<string>("date-time"))
          .required(t<string>("required"))
          .nullable(),
      }),
    [t]
  );
};

export default useFormPostValidationSchema;
