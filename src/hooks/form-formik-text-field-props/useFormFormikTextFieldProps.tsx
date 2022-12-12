import { TextFieldProps } from "@mui/material/TextField";
import { FormikValues } from "formik";
import { useMemo } from "react";
export const useFormFormikTextFieldProps = (
  formik: FormikValues,
  name: string,
  props?: TextFieldProps
): TextFieldProps => {
  const { values, handleChange, handleBlur, touched, errors } = formik;
  return useMemo(
    () => ({
      id: name,
      name,
      value: values[name] || "",
      onChange: handleChange,
      onBlur: handleBlur,
      error: touched[name] && Boolean(errors[name]),
      helperText: touched[name] && errors[name],
      ...props,
    }),
    [errors, handleBlur, handleChange, name, props, touched, values]
  );
};

export default useFormFormikTextFieldProps;
