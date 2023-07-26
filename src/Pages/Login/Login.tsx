import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../components/FormUI/TextFieldWrapper";
import ButtonW from "../../components/FormUI/Button/ButtonWrapper";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../Services/AllApiRequests/Account";
import Page from "../../Utils/route";
import "react-toastify/dist/ReactToastify.css";
import {
  REQUIRED_ERROR,
  TOASTER_SUCCESS_MSG,
  TOASTER_ERROR_MSG,
  NETWORK_ERROR,
} from "../../Utils/enums";
import BharatBookInfo from "../BharatBookInfo/BharatBookInfo";
import toastSuccess, { toastError } from "../../Utils/toast";

interface DecodedToken {
  email: string;
  UserId: string;
}

const INITIAL_FORM_STATE = {
  Email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  Email: Yup.string().email().required(REQUIRED_ERROR.EMAIL),
  password: Yup.string().min(6).required(REQUIRED_ERROR.PASSWORD),
});

interface LoginProps {
  toast: {
    error: (message: string) => void;
    success: (message: string) => void;
  };
}

const Login: React.FC<LoginProps> = ({ toast }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to toggle the password visibility
  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
  };

  // Function to prevent mouse down event propagation
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const data = {
        email: values.Email,
        password: values.password,
      };

      const response = await loginUser(data);

      // Set access token in local storage
      const decodedToken = jwtDecode(response) as DecodedToken;

      const tokenData = {
        accessToken: response,
        email: values.Email,
        userId: decodedToken.UserId,
      };

      const tokenDataString = JSON.stringify(tokenData);
      localStorage.setItem("access_token", tokenDataString);
      navigate(Page.HOME_PAGE);
      toastSuccess(TOASTER_SUCCESS_MSG.IS_LOGIN);
    } catch (err: any) {
      if (err.code === NETWORK_ERROR.BAD_REQUEST) {
        toastError(TOASTER_ERROR_MSG.INVALID_CRED);
      }
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
                height: ["470px"],
                width: ["340px", "400px"],
                borderRadius: "10px",
                backgroundColor: "white ",
                margin: ["auto", "auto"],
                boxShadow: "5px 7px 10px -8px rgba(0, 0, 0, 0.75)",
              }}
            >
              <Box>
                <LoginIcon sx={{ fontSize: "2rem", color: "#1877f2" }} />
              </Box>

              <Typography
                sx={{
                  marginBottom: "1rem",
                  fontSize: "1.3rem",
                  fontFamily: "cursive",
                }}
              >
                Login to Your Account
              </Typography>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <TextField
                    name="Email"
                    label="Email"
                    sx={{ margin: "0 1.8rem", width: ["80%"] }}
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    sx={{ margin: "1rem 1.8rem", width: ["80%"] }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
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
                      margin: "1.8rem",
                      width: ["80%"],
                      textTransform: "none",
                      fontSize: "1rem",
                      backgroundColor: "#1877f2",
                      fontWeight: "600",
                      "&:hover": {
                        backgroundColor: "#1877f2",
                      },
                    }}
                  >
                    Log In
                  </ButtonW>
                </Form>
              </Formik>

              <Typography
                sx={{
                  margin: "1rem",
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
                to={Page.REGISTRATION_PAGE}
                component={Link}
                sx={{
                  width: ["50%", "60%", "60%"],
                  backgroundColor: "#42b72a",
                  color: "white",
                  textTransform: "none",
                  fontSize: ["0.7rem", "1rem", "1rem"],
                  fontWeight: ["400", "600", "600"],
                  "&:hover": {
                    backgroundColor: "#42b72a",
                  },
                }}
              >
                Create New Account
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

export default Login;
