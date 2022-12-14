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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import prepareSubmittedData from "../../utils/prepareSubmittedData";

interface FormPostProps {
  values: Post;
}

const FORM_FIELDS_MAX_WIDTH = 400;
const FORM_TEXTAREA_MAX_WIDTH = 800;

export const FormPost: React.FC<FormPostProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormPostValidationSchema(),
    onSubmit: async (newValues, { setSubmitting, resetForm }) => {
      const preparedValues = prepareSubmittedData(newValues, {
        date: ["datePublished"],
      });

      try {
        if (values.id) {
          await updatePost(preparedValues).unwrap();
        } else {
          const id = uuid();
          await addPost({ ...preparedValues, id }).unwrap();
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
  const subtitleFieldProps = useFormFormikTextFieldProps(formik, "subtitle");
  const bodyFieldProps = useFormFormikTextFieldProps(formik, "body");
  const datePublishedFieldProps = useFormFormikTextFieldProps(
    formik,
    "datePublished",
    { onChange: undefined }
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <TextField
          label={t("label.title")}
          {...titleFieldProps}
          sx={{ maxWidth: FORM_FIELDS_MAX_WIDTH }}
        />
        <Stack maxWidth={FORM_TEXTAREA_MAX_WIDTH} gap={3}>
          <TextField
            label={t("label.subtitle")}
            {...subtitleFieldProps}
            multiline
            rows={4}
          />
          <TextField
            label={t("label.body-text")}
            {...bodyFieldProps}
            multiline
            minRows={10}
            maxRows={20}
          />
        </Stack>
        <Stack maxWidth={FORM_FIELDS_MAX_WIDTH} gap={3}>
          <TextField label={t("label.alias")} {...aliasFieldProps} />
          <DateTimePicker
            label={t("label.date-published")}
            renderInput={(params) => (
              <TextField fullWidth {...params} {...datePublishedFieldProps} />
            )}
            value={formik.values.datePublished || ""}
            onChange={(value) =>
              formik.setFieldValue("datePublished", value, true)
            }
          />
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
        </Stack>
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
