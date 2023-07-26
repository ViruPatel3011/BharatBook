import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import RegistrationForm from "./RegistrationForm";
import { useNavigate } from "react-router-dom";
import Page from "../../Utils/route";
import {
  REQUIRED_ERROR,
  VALIDATION_MESSAGE,
  TOASTER_SUCCESS_MSG,
} from "../../Utils/enums";
import { IRegisterForm, RegisterForm } from "../../Models/Registration";
import { IRegister } from "../../Utils/params";
import { RegistrationForUser } from "../../Services/AllApiRequests/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const INITIAL_FORM_STATE: IRegisterForm = new RegisterForm();

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Name is Too Short !")
      .max(20, "Max 20 character allowed!")
      .required(REQUIRED_ERROR.FIRST_NAME),
    lastName: Yup.string()
      .min(2, "Name is Too Short !")
      .max(20, "Max 20 character allowed!")
      .required(REQUIRED_ERROR.LAST_NAME),
    email: Yup.string().email("Invalid email").required(REQUIRED_ERROR.EMAIL),
    phoneNumber: Yup.number()
      .typeError(VALIDATION_MESSAGE.PHONE_NUMBER_VALIDATE)
      .positive(VALIDATION_MESSAGE.PHNUM_MINUS_VALIDATE)
      .integer(VALIDATION_MESSAGE.PHNUM_DECIMAL)
      .test("is-ten-digit", VALIDATION_MESSAGE.PHNUM_TEN_DIGIT, (value) =>
        /^\d{10}$/.test(value)
      )
      .required(REQUIRED_ERROR.PHONE_NUMBER),

    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        VALIDATION_MESSAGE.PASS_VALIDATE
      )
      .required(REQUIRED_ERROR.PASSWORD),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(REQUIRED_ERROR.CONFIRM_PASSWORD),
    birthDate: Yup.string().required(REQUIRED_ERROR.BIRTHDATE),
    gender: Yup.string().required(REQUIRED_ERROR.GENDER),
  });

  const handleSubmit = async (values) => {
    const registerformData: IRegister = {
      UserId: 0,
      FirstName: values.firstName,
      LastName: values.lastName,
      PhoneNumber: values.phoneNumber,
      Password: values.password,
      Email: values.email,
      BirthDate: values.birthDate,
    };

    console.log(values);
    try {
      await RegistrationForUser(registerformData);
      console.log("Registration successful", registerformData);
    } catch (error) {
      console.error("Registration failed", error);
    }
    navigate(Page.LOGIN_PAGE);
    toast.success(TOASTER_SUCCESS_MSG.IS_REGISTER);
    const { submitForm, resetForm } = useFormikContext();
    submitForm();
    resetForm();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f0f2f5",
          display: "flex",
          justifyContent: ["start", "start", "center"],
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  marginBottom: ["1rem", "1rem", "0"],
                  backgroundColor: "#243e5e",
                  borderRadius: "10px",
                  display: ["none", "none", "block"],
                }}
              >
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    color: "transparent",
                    backgroundImage:
                      "linear-gradient(to top, #0458ad, #12d6ff)",
                    backgroundClip: "text",
                    margin: "0.7rem 0.7rem 0 0.7rem",
                    WebkitBackgroundClip: "text",
                    fontFamily: "fantasy",
                  }}
                >
                  BharatBook
                </Typography>
                ;
              </Box>
              <Typography
                sx={{
                  fontSize: ["", "", "20px", "25px"],
                  margin: "1rem",
                  textAlign: "center",
                  display: ["none", "none", "block"],
                  fontFamily:
                    "SFProDisplay-Regular, Helvetica, Arial, sans-serif",
                }}
              >
                BharatBook helps you connectand share <br />
                with the people in your life
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                width: ["70%", "60%", "80%"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: ["1rem", "2rem"],
                borderRadius: "10px",
                backgroundColor: "white ",
                margin: ["auto", "auto"],
                boxShadow: "5px 7px 10px -8px rgba(0, 0, 0, 0.75)",
                marginBottom: ["1rem"],
              }}
            >
              <Box sx={{ margin: "1rem", display: "flex" }}>
                <AppRegistrationIcon sx={{ fontSize: "2.5rem" }} />
                <Typography sx={{ margin: "auto 1rem", fontSize: "1.3rem" }}>
                  Create Account
                </Typography>
              </Box>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <RegistrationForm />
                </Form>
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Registration;
