import React, { useCallback, useEffect, useMemo } from "react";
import { FormikConfig, useFormik } from "formik";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import { useLoginUserMutation } from "../../services/users";
import { User } from "../../types/api";
import { useMutationsSnackbar } from "../../hooks/snackbar";

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

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();
  useMutationsSnackbar(false, isError, "", "form.error.login");

  const onSubmit = useCallback<
    FormikConfig<{ email: string; password: string }>["onSubmit"]
  >(
    async (newValues, { resetForm }) => {
      const resp = await loginUser(newValues);
      const data = (resp as { data: User })?.data;
      if (data) {
        resetForm();
        enqueueSnackbar(t("success.login", { name: data.name }), {
          variant: "success",
        });
      }
    },
    [enqueueSnackbar, loginUser, t]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    resetForm,
    values: { email },
  } = formik;

  useEffect(() => {
    if (isError) {
      resetForm({
        values: { email, password: "" },
      });
    }
  }, [email, isError, resetForm]);

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
            loading={isLoading}
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
