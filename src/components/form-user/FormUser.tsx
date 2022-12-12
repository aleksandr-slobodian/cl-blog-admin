import React from "react";
import { useFormik } from "formik";
import { User } from "../../types/api";
import useFormUserValidationSchema from "./useFormUserValidationSchema";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import {
  useAddPostMutation,
  useUpdateUserMutation,
} from "../../services/users";
interface FormUserProps {
  values: User;
}

export const FormUser: React.FC<FormUserProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [addUser] = useAddPostMutation();
  const [updatUser] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormUserValidationSchema(),
    onSubmit: async (newValues, { setSubmitting, resetForm }) => {
      try {
        if (values.id) {
          await updatUser(newValues).unwrap();
        } else {
          const id = uuid();
          await addUser({ ...newValues, id }).unwrap();
          resetForm();
        }
      } catch (error) {
        console.warn(error);
      }
      setSubmitting(false);
    },
  });

  const nameFieldProps = useFormFormikTextFieldProps(formik, "name");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3} maxWidth={400}>
        <TextField fullWidth label={t("label.full-name")} {...nameFieldProps} />
        <div>
          <LoadingButton
            disabled={!formik.dirty}
            loading={formik.isSubmitting}
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
