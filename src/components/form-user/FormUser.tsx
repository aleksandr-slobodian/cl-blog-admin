import React, { useCallback } from "react";
import { FormikConfig, useFormik } from "formik";
import { User } from "../../types/api";
import useFormUserValidationSchema from "./useFormUserValidationSchema";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../../services/users";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useMutationsSnackbar } from "../../hooks/snackbar";
interface FormUserProps {
  values: User;
}

export const FormUser: React.FC<FormUserProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [
    addUser,
    {
      isLoading: isLoadingCreateUser,
      isSuccess: isSuccessCreateUser,
      isError: isErrorCreateUser,
    },
  ] = useAddUserMutation();
  const [
    updatUser,
    {
      isLoading: isLoadingUpdateUser,
      isSuccess: isSuccessUpdateUser,
      isError: isErrorUpdateUser,
    },
  ] = useUpdateUserMutation();

  useMutationsSnackbar(
    !values.id ? isSuccessCreateUser : isSuccessUpdateUser,
    !values.id ? isErrorCreateUser : isErrorUpdateUser,
    !values.id ? "form.success.create" : "form.success.update",
    !values.id ? "form.error.create" : "form.error.update"
  );

  const onSubmit = useCallback<FormikConfig<User>["onSubmit"]>(
    async (newValues, { resetForm }) => {
      if (values.id) {
        delete newValues["avatar"];
        updatUser(newValues).unwrap();
      } else {
        const id = uuid();
        await addUser({ ...newValues, id }).unwrap();
        resetForm();
      }
    },
    [addUser, updatUser, values.id]
  );

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormUserValidationSchema(),
    onSubmit,
  });

  const nameFieldProps = useFormFormikTextFieldProps(formik, "name");
  const emailFieldProps = useFormFormikTextFieldProps(formik, "email");
  const passwordFiledProps = useFormFormikTextFieldProps(formik, "password");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3} maxWidth={400}>
        <TextField label={t("label.full-name")} {...nameFieldProps} />
        <TextField label={t("label.email")} {...emailFieldProps} />
        <TextField
          label={t("label.password")}
          {...passwordFiledProps}
          type="password"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isAdmin"
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
            />
          }
          label={t("label.isAdmin")}
        />
        <div>
          <LoadingButton
            disabled={!formik.dirty}
            loading={!values.id ? isLoadingCreateUser : isLoadingUpdateUser}
            color="primary"
            variant="contained"
            type="submit"
          >
            {t(!values.id ? "button.create" : "button.update")}
          </LoadingButton>
        </div>
      </Stack>
    </form>
  );
};

export default FormUser;
