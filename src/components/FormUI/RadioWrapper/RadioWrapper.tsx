import React from "react";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { IGender } from "./RadioTypes";
import { FormikErrors, FormikProps } from "formik";

interface IRadioGroupProps extends RadioGroupProps {
  options: IGender[];
  field: Field;
  // form: FormikProps<FormValues>;
}

type Field = {
  name: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const RadioWrapper: React.FC<IRadioGroupProps> = ({
  field,
  form: { touched, errors },
  name,
  options,
  children,
  ...props
}) => {
  const fieldName = name || field.name;

  const renderOptions = (options: IGender[]) => {
    return options.map((option) => (
      <FormControlLabel
        control={<Radio />}
        key={option.id}
        value={option.id}
        label={option.gender}
        sx={{ width: "fit-content", marginTop: 0, marginRight: 3 }}
      />
    ));
  };

  return (
    <React.Fragment>
      <RadioGroup
        {...field}
        name={fieldName}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {options ? renderOptions(options) : null}
      </RadioGroup>
      {touched[fieldName] && errors[fieldName] && (
        <Typography color="error" sx={{ marginLeft: 2, fontSize: 13 }}>
          {errors[fieldName]}
        </Typography>
      )}
    </React.Fragment>
  );
};

export default RadioWrapper;
