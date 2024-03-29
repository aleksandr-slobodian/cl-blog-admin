import React, { SyntheticEvent, useCallback } from "react";
import { FormikConfig, useFormik } from "formik";
import { Category, Post, User } from "../../types/api";
import useFormPostValidationSchema from "./useFormPostValidationSchema";
import { useAppDispatch, useFormFormikTextFieldProps } from "../../hooks";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/system/Stack";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from "../../services/posts";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import prepareSubmittedData from "../../utils/prepareSubmittedData";
import FieldImage from "../field-image/FieldImage";
import { toggleDrawer } from "../../state/drawers";
import DrawerImages from "../drawer-images/DrawerImages";
import CategoriesAutocomplete from "./components/CategoriesAutocomplete";
import AuthorAutocomplete from "./components/AuthorAutocomplete";
import { useMutationsSnackbar } from "../../hooks/snackbar";

interface FormPostProps {
  values: Post;
}

const FORM_FIELDS_MAX_WIDTH = 400;
const FORM_TEXTAREA_MAX_WIDTH = 800;

export const FormPost: React.FC<FormPostProps> = ({ values }) => {
  const { t } = useTranslation("main", { keyPrefix: "form" });

  const dispatch = useAppDispatch();

  const [
    addPost,
    {
      isLoading: isLoadingCreatePost,
      isSuccess: isSuccessCreatePost,
      isError: isErrorCreatePost,
    },
  ] = useAddPostMutation();
  const [
    updatePost,
    {
      isLoading: isLoadingUpdatePost,
      isSuccess: isSuccessUpdatePost,
      isError: isErrorUpdatePost,
    },
  ] = useUpdatePostMutation();

  useMutationsSnackbar(
    !values.id ? isSuccessCreatePost : isSuccessUpdatePost,
    !values.id ? isErrorCreatePost : isErrorUpdatePost,
    !values.id ? "form.success.create" : "form.success.update",
    !values.id ? "form.error.create" : "form.error.update"
  );

  const onSubmit = useCallback<FormikConfig<Post>["onSubmit"]>(
    async (newValues, { resetForm }) => {
      const preparedValues = prepareSubmittedData(newValues, {
        date: ["datePublished"],
      });

      if (preparedValues?.user) {
        delete preparedValues.user;
      }

      if (values.id) {
        updatePost(preparedValues).unwrap();
      } else {
        const id = uuid();
        await addPost({ ...preparedValues, id }).unwrap();
        resetForm({
          values: {
            ...values,
            categoriesIds: newValues.categoriesIds,
            userId: newValues.userId,
            user: newValues.user,
          },
        });
      }
    },
    [addPost, updatePost, values]
  );

  const formik = useFormik({
    initialValues: values,
    validationSchema: useFormPostValidationSchema(),
    onSubmit,
  });

  const userIdFieldProps = useFormFormikTextFieldProps(formik, "userId", {
    onChange: undefined,
  });
  const titleFieldProps = useFormFormikTextFieldProps(formik, "title");
  const aliasFieldProps = useFormFormikTextFieldProps(formik, "alias");
  const subtitleFieldProps = useFormFormikTextFieldProps(formik, "subtitle");
  const bodyFieldProps = useFormFormikTextFieldProps(formik, "body");
  const imageFieldProps = useFormFormikTextFieldProps(formik, "image");
  const datePublishedFieldProps = useFormFormikTextFieldProps(
    formik,
    "datePublished",
    { onChange: undefined }
  );

  const handleImageFieldIconClick = useCallback(() => {
    dispatch(toggleDrawer("images-drawer"));
  }, [dispatch]);

  const handleImageSelect = useCallback(
    (name: string) => {
      formik.setFieldValue("image", name);
      dispatch(toggleDrawer("images-drawer"));
    },
    [dispatch, formik]
  );

  const { categoriesIds, user } = values;

  const handleCategoriesChange = useCallback(
    (event: SyntheticEvent, values: Category[]) => {
      formik.setFieldValue(
        "categoriesIds",
        values.map((cat) => cat.id)
      );
    },
    [formik]
  );

  const handleUserChange = useCallback(
    (event: SyntheticEvent, value: User | null | undefined) => {
      formik.setFieldValue("userId", value?.id || "");
      formik.setFieldValue("user", value);
    },
    [formik]
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={3}>
          <TextField
            label={t("label.title")}
            {...titleFieldProps}
            sx={{ maxWidth: FORM_FIELDS_MAX_WIDTH }}
          />
          <CategoriesAutocomplete
            label={t("label.categories")}
            values={categoriesIds}
            handleChange={handleCategoriesChange}
            sx={{ maxWidth: FORM_FIELDS_MAX_WIDTH }}
          />
          <AuthorAutocomplete
            selected={user}
            textFieldProps={userIdFieldProps}
            label={t("label.author")}
            placeholder={t("label.typeToSearch")}
            noOptionsText={t<string>("label.typeToSearch")}
            handleChange={handleUserChange}
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
            <FieldImage
              {...imageFieldProps}
              label={t("label.image")}
              sx={{ maxWidth: FORM_FIELDS_MAX_WIDTH }}
              onIconClick={handleImageFieldIconClick}
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
              loading={!values.id ? isLoadingCreatePost : isLoadingUpdatePost}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t(!values.id ? "button.create" : "button.update")}
            </LoadingButton>
          </div>
        </Stack>
      </form>
      <DrawerImages onItemClick={handleImageSelect} />
    </>
  );
};

export default FormPost;
