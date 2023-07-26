import React, { ReactNode } from "react";
import { Button, SxProps } from "@mui/material";
import { useFormikContext } from "formik";

interface ButtonWrapperProps {
  children: ReactNode;
  sx?: SxProps;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  children,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = (): void => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    variant: "contained" as const,
    color: "primary" as const,
    fullWidth: true,
    onClick: handleSubmit,
  };
  return (
    <React.Fragment>
      <Button {...configButton}>{children}</Button>
    </React.Fragment>
  );
};

export default ButtonWrapper;
