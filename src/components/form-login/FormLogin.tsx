import React, { useMemo } from "react";
import { useFormik } from "formik";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useLoginUserMutation } from "../../services/users";
import { User } from "../../types/api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const FormLogin: React.FC = () => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email(t<string>("validation.email"))
          .required(t<string>("validation.required")),
        password: yup
          .string()
          .min(8, t<string>("validation.min", { min: 8 }))
          .required(t<string>("validation.required")),
      }),
    [t]
  );

  const initialValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const [loginUser] = useLoginUserMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (newValues, { setSubmitting, resetForm }) => {
      try {
        const resp = await loginUser(newValues);
        const error = (resp as { error: FetchBaseQueryError })?.error;
        if (error) {
          resetForm({ values: { email: newValues.email, password: "" } });
          enqueueSnackbar(t("error.login"), {
            variant: "error",
          });
        } else {
          resetForm();
          enqueueSnackbar(
            t("success.login", { name: (resp as { data: User })?.data.name }),
            {
              variant: "success",
            }
          );
        }
      } catch (error) {
        enqueueSnackbar(t("error.login"), {
          variant: "error",
        });
      }
      setSubmitting(false);
    },
  });

  const emailFieldProps = useFormFormikTextFieldProps(formik, "email");
  const passwordFiledProps = useFormFormikTextFieldProps(formik, "password");

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ width: "100%", maxWidth: 360 }}
    >
      <Stack gap={3}>
        <TextField label={t("label.email")} {...emailFieldProps} />
        <TextField
          label={t("label.password")}
          {...passwordFiledProps}
          type="password"
        />

        <div>
          <LoadingButton
            disabled={!formik.dirty}
            loading={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
          >
            {t("button.submit")}
          </LoadingButton>
        </div>
      </Stack>
    </form>
  );
};

export default FormLogin;
