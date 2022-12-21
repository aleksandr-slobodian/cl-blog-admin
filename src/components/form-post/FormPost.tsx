import React from "react";
import { useFormik } from "formik";
import { Post } from "../../types/api";
import useFormPostValidationSchema from "./useFormPostValidationSchema";
import { useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from "../../services/posts";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface FormPostProps {
  values: Post;
}

export const FormPost: React.FC<FormPostProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormPostValidationSchema(),
    onSubmit: async (newValues, { setSubmitting, resetForm }) => {
      try {
        if (values.id) {
          await updatePost(newValues).unwrap();
        } else {
          const id = uuid();
          await addPost({ ...newValues, id }).unwrap();
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

export default FormPost;
