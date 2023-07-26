import React, { useState, useContext } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/FormUI/TextFieldWrapper";
import ButtonW from "../../components/FormUI/Button/ButtonWrapper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Page from "../../Utils/route";
import Button from "@mui/material/Button";
import { ResetPass } from "../../Services/AllApiRequests/Account";
import { EmailContext } from "../../Context/EmailContext";
import {
  REQUIRED_ERROR,
  TOASTER_SUCCESS_MSG,
  VALIDATION_MESSAGE,
} from "../../Utils/enums";
import "react-toastify/dist/ReactToastify.css";
import BharatBookInfo from "../BharatBookInfo/BharatBookInfo";
import toastSuccess from "../../Utils/toast";

const INITIAL_FORM_STATE = {
  newPassword: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      VALIDATION_MESSAGE.PASS_VALIDATE
    )
    .required(REQUIRED_ERROR.PASSWORD),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required(REQUIRED_ERROR.CONFIRM_PASSWORD),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  // Function to toggle the password visibility
  const handleShowNewPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setNewPassword(!newPassword);
  };

  const handleShowConfPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setConfirmPassword(!confirmPassword);
  };

  // Function to prevent mouse down event propagation
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const response = await ResetPass(email, "", values.newPassword);
      navigate(Page.LOGIN_PAGE);
      toastSuccess(TOASTER_SUCCESS_MSG.PASSWORD_CHANGED);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f0f2f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={1}>
          <BharatBookInfo />

          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // height: ["340px", "450px", "450px"],
                width: ["340px", "450px", "450px"],
                borderRadius: "10px",
                backgroundColor: "white ",
                margin: ["auto", "auto"],
                boxShadow: "5px 7px 10px -8px rgba(0, 0, 0, 0.75)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    fontSize: "3.5rem",
                    margin: "1rem 0",
                    color: "#07bc0c",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: ["1rem", "1.7rem"],
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  Reset Password
                </Typography>
              </Box>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <TextField
                    name="newPassword"
                    label="New Password"
                    type={newPassword ? "text" : "password"}
                    sx={{ margin: "1rem 1.5rem", width: ["70%", "80%", "80%"] }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {newPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={confirmPassword ? "text" : "password"}
                    sx={{ margin: "1rem 1.5rem", width: ["70%", "80%", "80%"] }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowConfPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {confirmPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ButtonW
                    sx={{
                      margin: "1.5rem",
                      width: ["70%", "80%", "80%"],
                      textTransform: "none",
                      fontSize: "1rem",
                      backgroundColor: "#42b72a",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "#42b72a",
                      },
                    }}
                  >
                    Change your Password
                  </ButtonW>
                </Form>
              </Formik>

              <Typography
                sx={{
                  color: "#2e81f4",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                component={Link}
                to={Page.FORGOTPASS_PAGE}
              >
                Forgot Password ?
              </Typography>

              <Divider />
              <Button
                to={Page.LOGIN_PAGE}
                component={Link}
                sx={{
                  width: ["40%", "50%", "50%"],
                  backgroundColor: "#1877f2",
                  color: "white",
                  margin: "1rem",
                  textTransform: "none",
                  fontSize: ["0.7rem", "1rem", "1rem"],
                  fontWeight: ["400", "600", "600"],
                  "&:hover": {
                    backgroundColor: "#1877f2",
                  },
                }}
              >
                Login
              </Button>
            </Box>
            <Typography sx={{ margin: "1.3rem", textAlign: "center" }}>
              <strong>Create page</strong>for a celebrity,band or business
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ResetPassword;
