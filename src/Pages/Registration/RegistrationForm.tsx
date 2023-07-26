import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Field } from "formik";

import { Link } from "react-router-dom";
import Page from "../../Utils/route";
import Button from "@mui/material/Button";
import TextField from "../../components/FormUI/TextFieldWrapper";

import RadioWrapper from "../../components/FormUI/RadioWrapper/RadioWrapper";

const genderOptions = [
  { id: 1, gender: "Male" },
  { id: 2, gender: "Female" },
  { id: 3, gender: "Other" },
];

// const genderOptions = ["male", "female", "other"];
const RegistrationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setConfPassword] = useState<boolean>(false);

  // Function to toggle the password visibility
  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setConfPassword(!showConfPassword);
  };

  // Function to prevent mouse down event propagation
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField label="First Name" name="firstName" />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField label="Last Name" name="lastName" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email" name="email" />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Mobile Number" name="phoneNumber" />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility2"
                  onClick={handleClickShowConfPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />{" "}
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ display: "inline", color: "gray" }}>
          Birth Date
        </Typography>
        <TextField name="birthDate" type="date" />
      </Grid>

      <Grid item xs={12}>
        <Field
          name="gender"
          options={genderOptions}
          component={RadioWrapper}
        ></Field>
      </Grid>

      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: ["0.7rem", "1rem", "1rem"],
            fontWeight: ["400", "600", "600"],
            backgroundColor: "#42b72a",
            "&:hover": {
              backgroundColor: "#42b72a",
            },
          }}
        >
          Register
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#1877f2",
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
            width: "100%",
          }}
          component={Link}
          to={Page.FORGOTPASS_PAGE}
        >
          Forgot Password?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Button
          to={Page.LOGIN_PAGE}
          component={Link}
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: ["0.7rem", "1rem", "1rem"],
            fontWeight: ["400", "600", "600"],
            backgroundColor: "#1877f2",
            "&:hover": {
              backgroundColor: "#1877f2",
            },
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
