import React, { useState, useContext } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "../../components/FormUI/TextFieldWrapper";
import { EmailContext } from "../../Context/EmailContext";
import BharatBookInfo from "../BharatBookInfo/BharatBookInfo";
import { ForgotPass, VerifyToken } from "../../Services/AllApiRequests/Account";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page from "../../Utils/route";
import {
  REQUIRED_ERROR,
  TOASTER_ERROR_MSG,
  TOASTER_SUCCESS_MSG,
} from "../../Utils/enums";
import toastSuccess, { toastError } from "../../Utils/toast";

const INITIAL_FORM_STATE = {
  email: "",
  code: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED_ERROR.EMAIL),
});

const ForgotPassword: React.FC = () => {
  const { setEmail } = useContext(EmailContext);
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleEmailConfirmation = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const response = await ForgotPass(values.email);
      console.log(response);
      setEmail(values.email);
      setUserEmail(values.email);
      setValidEmail(true);
      toastSuccess(TOASTER_SUCCESS_MSG.CODE_SENT);
    } catch (err: any) {
      toastError(TOASTER_ERROR_MSG.USER_NOT_EXIST);
      throw err;
    }
  };

  const handleVerifyToken = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const response = await VerifyToken(userEmail, values.code);
      navigate(Page.RESETPASS_PAGE);
      toastSuccess(TOASTER_SUCCESS_MSG.TOKEN_VERIFIED);
      console.log("Verify:", response);
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
                height: ["430px", "450px", "450px"],
                width: ["340px", "420px"],
                borderRadius: "10px",
                backgroundColor: "white ",
                margin: "auto",
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
                <InfoOutlinedIcon
                  sx={{
                    fontSize: "3.5rem",
                    margin: "1rem 0",
                    color: "#3b7dcc",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: ["1rem", "1.7rem"],
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  Forgot Password
                </Typography>

                {!validEmail ? (
                  <Typography sx={{ margin: "1rem" }}>
                    Enter Your email and we'll send you a link to reset your
                    password
                  </Typography>
                ) : (
                  <Typography sx={{ margin: "1rem" }}>
                    Enter Your Verification Code
                  </Typography>
                )}
              </Box>

              {!validEmail ? (
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={handleEmailConfirmation}
                >
                  <Form>
                    <TextField
                      name="email"
                      label="Enter Email"
                      sx={{
                        margin: "0 1.5rem",
                        width: ["84%"],
                      }}
                    />
                    <Button
                      type="submit"
                      sx={{
                        margin: "1.5rem 2rem",
                        width: ["80%", "80%", "80%"],
                        textTransform: "none",
                        fontSize: "1rem",
                        backgroundColor: "#1877f2",
                        fontWeight: "600",
                        "&:hover": {
                          backgroundColor: "#1877f2",
                        },
                      }}
                    >
                      <Typography sx={{ color: "white" }}>Send</Typography>
                    </Button>
                  </Form>
                </Formik>
              ) : (
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  validationSchema={Yup.object().shape({
                    code: Yup.string().required(REQUIRED_ERROR.CODE),
                  })}
                  onSubmit={handleVerifyToken}
                >
                  <Form>
                    <TextField
                      name="code"
                      label="Enter Code"
                      sx={{
                        margin: "0 1.5rem",
                        width: ["70%", "80%", "80%"],
                      }}
                    />
                    <Button
                      type="submit"
                      sx={{
                        margin: "1.5rem",
                        width: ["60%", "80%", "80%"],
                        textTransform: "none",
                        fontSize: "1rem",
                        backgroundColor: "#1877f2",
                        fontWeight: "600",
                        "&:hover": {
                          backgroundColor: "#1877f2",
                        },
                      }}
                    >
                      <Typography sx={{ color: "white" }}>Submit</Typography>
                    </Button>
                  </Form>
                </Formik>
              )}

              <Box
                sx={{ display: "flex", flexDirection: "column", width: "70%" }}
              >
                <Typography
                  sx={{
                    margin: "0rem auto 0.3rem auto",
                    color: "#2e81f4",
                    cursor: "pointer",
                    fontSize: "1.3rem",
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={Page.LOGIN_PAGE}
                >
                  Login
                </Typography>
                <Divider />
                <Typography
                  sx={{
                    margin: "0.7rem auto 0 auto",
                    color: "#42b72a",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={Page.REGISTRATION_PAGE}
                >
                  Register YourSelf
                </Typography>
              </Box>
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

export default ForgotPassword;
