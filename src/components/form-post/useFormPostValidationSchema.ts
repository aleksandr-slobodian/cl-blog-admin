import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

const FORM_V_TITLE_MIN = 1;
const FORM_V_TITLE_MAX = 50;

const FORM_V_SUBTITLE_MIN = 1;
const FORM_V_SUBTITLE_MAX = 400;

const FORM_V_BODY_MIN = 1;
const FORM_V_BODY_MAX = 20000;

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
        subtitle: yup
          .string()
          .min(
            FORM_V_SUBTITLE_MIN,
            t<string>("min", { min: FORM_V_SUBTITLE_MIN })
          )
          .max(
            FORM_V_SUBTITLE_MAX,
            t<string>("max", { max: FORM_V_SUBTITLE_MAX })
          )
          .required(t<string>("required")),
        body: yup
          .string()
          .min(FORM_V_BODY_MIN, t<string>("min", { min: FORM_V_BODY_MIN }))
          .max(FORM_V_BODY_MAX, t<string>("max", { max: FORM_V_BODY_MAX }))
          .required(t<string>("required")),
        image: yup
          .string()
          .required(t<string>("required"))
          .matches(
            /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}\b.(jpeg|png|webp)$/,
            t<string>("image")
          ),
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
