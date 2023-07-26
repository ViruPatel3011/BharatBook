import React from "react";
import { TextField, SxProps, InputProps, TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface TextFieldWrapperProps extends Omit<TextFieldProps, "name"> {
  name: string;
  // sx?: SxProps;
  // label?: string;
  // type?: string;
  // value?: string;
  // InputProps?: InputProps;
  // variant?: "standard" | "outlined" | "filled";
  // onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldWrapper: React.FC<TextFieldWrapperProps> = ({
  name,
  InputProps,
  ...otherProps
}) => {
  const [field, mata] = useField(name);
  const configTextField: TextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined" as const,
    error: false,
    helperText: "",
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }

  return (
    <React.Fragment>
      <TextField {...configTextField} InputProps={InputProps} />
    </React.Fragment>
  );
};

export default TextFieldWrapper;
