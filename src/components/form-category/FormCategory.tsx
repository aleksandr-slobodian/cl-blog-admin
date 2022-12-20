import React from "react";
import { useFormik } from "formik";
import { Category } from "../../types/api";
import useFormCategoryValidationSchema from "./useFormCategoryValidationSchema";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/categories";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface FormCategoryProps {
  values: Category;
}

export const FormCategory: React.FC<FormCategoryProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormCategoryValidationSchema(),
    onSubmit: async (newValues, { setSubmitting, resetForm }) => {
      try {
        if (values.id) {
          await updateCategory(newValues).unwrap();
        } else {
          const id = uuid();
          await addCategory({ ...newValues, id }).unwrap();
          resetForm();
        }
        enqueueSnackbar(t(!values.id ? "success.create" : "success.update"), {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(t(!values.id ? "error.create" : "error.update"), {
          variant: "error",
        });
      }
      setSubmitting(false);
    },
  });

  const titleFieldProps = useFormFormikTextFieldProps(formik, "title");
  const aliasFieldProps = useFormFormikTextFieldProps(formik, "alias");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3} maxWidth={400}>
        <TextField label={t("label.title")} {...titleFieldProps} />
        <TextField label={t("label.alias")} {...aliasFieldProps} />
        <FormControlLabel
          control={
            <Checkbox
              name="isPublished"
              checked={formik.values.isPublished}
              onChange={formik.handleChange}
            />
          }
          label={t("label.published")}
        />
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

export default FormCategory;
