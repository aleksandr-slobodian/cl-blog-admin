import React, { useCallback } from "react";
import { FormikConfig, useFormik } from "formik";
import { Category } from "../../types/api";
import useFormCategoryValidationSchema from "./useFormCategoryValidationSchema";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/categories";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useMutationsSnackbar } from "../../hooks/snackbar";

interface FormCategoryProps {
  values: Category;
}

export const FormCategory: React.FC<FormCategoryProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [
    addCategory,
    {
      isLoading: isLoadingCreateCategory,
      isSuccess: isSuccessCreateCategory,
      isError: isErrorCreateCategory,
    },
  ] = useAddCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: isLoadingUpdateCategory,
      isSuccess: isSuccessUpdateCategory,
      isError: isErrorUpdateCategory,
    },
  ] = useUpdateCategoryMutation();

  useMutationsSnackbar(
    !values.id ? isSuccessCreateCategory : isSuccessUpdateCategory,
    !values.id ? isErrorCreateCategory : isErrorUpdateCategory,
    !values.id ? "form.success.create" : "form.success.update",
    !values.id ? "form.error.create" : "form.error.update"
  );

  const onSubmit = useCallback<FormikConfig<Category>["onSubmit"]>(
    async (newValues, { resetForm }) => {
      if (values.id) {
        updateCategory(newValues).unwrap();
      } else {
        const id = uuid();
        await addCategory({ ...newValues, id }).unwrap();
        resetForm();
      }
    },
    [addCategory, updateCategory, values.id]
  );

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormCategoryValidationSchema(),
    onSubmit,
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
            loading={
              !values.id ? isLoadingCreateCategory : isLoadingUpdateCategory
            }
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
