import React, { useContext, useEffect, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UserContext from "../../../Context/UserContext";
import { ICountries } from "../../../Models/Country";
import { ICities } from "../../../Models/City";
import { useFormik } from "formik";
import * as Yup from "yup";
import toastSuccess from "../../../Utils/toast";
import { TOASTER_SUCCESS_MSG } from "../../../Utils/enums";
import { REQUIRED_ERROR, VALIDATION_MESSAGE } from "../../../Utils/enums";
import {
  CountriesList,
  CitiesList,
  RegistrationForUser,
} from "../../../Services/AllApiRequests/User";

interface DialogProps {
  handleDialogClose: () => void;
  isOpen: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileDialog: React.FC<DialogProps> = ({
  handleDialogClose,
  isOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userData, setUserData, userAvatar } = useContext(UserContext);
  const [allCountries, setAllCountries] = useState<ICountries[]>([]);
  const [allCities, setAllCities] = useState<ICities[]>([]);
  const [someCities, setSomeCities] = useState<ICities[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<number>(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  interface FormValues {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: number;
    birthDate: string;
    address: string;
    profileText: string;
    city: number;
    country: number;
    avtarImg: string;
  }

  const formik = useFormik({
    initialValues: {
      userId: userData.userId,
      firstName: userData.firstName ? userData.firstName : "",
      lastName: userData.lastName,
      mobileNumber: userData.phoneNumber ? userData.phoneNumber : "",
      birthDate: userData.birthDate ? userData.birthDate : "",
      profileText: userData.profileText ? userData.profileText : "",
      address: userData.address ? userData.address : "",
      country: userData.countryId ? userData.countryId : "",
      city: userData.cityId ? userData.cityId : "",
      email: userData.email,
      avtarImg: userData.avatar,
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(REQUIRED_ERROR.FIRST_NAME),
      lastName: Yup.string().required(REQUIRED_ERROR.LAST_NAME),
      mobileNumber: Yup.number()
        .typeError(VALIDATION_MESSAGE.PHONE_NUMBER_VALIDATE)
        .positive(VALIDATION_MESSAGE.PHNUM_MINUS_VALIDATE)
        .integer(VALIDATION_MESSAGE.PHNUM_DECIMAL)
        .test("is-ten-digit", VALIDATION_MESSAGE.PHNUM_TEN_DIGIT, (value) =>
          /^\d{10}$/.test(value)
        )
        .required(REQUIRED_ERROR.PHONE_NUMBER),
    }),

    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleCameraIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (values: FormValues) => {
    const updateUserDetails = {
      UserId: userData.userId,
      Email: userData.email,
      FirstName: values.firstName,
      LastName: values.lastName,
      PhoneNumber: values.mobileNumber,
      BirthDate: values.birthDate,
      Address: values.address,
      ProfileText: values.profileText,
      CityId: values.city,
      CountryId: values.country,
      UserProfile: values.avtarImg,
    };
    try {
      const response = await RegistrationForUser(updateUserDetails);
      setUserData(response);
      toastSuccess(TOASTER_SUCCESS_MSG.PROFILE_UPDATED);
      handleDialogClose();
    } catch (err) {
      throw err;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(file.name);
  };

  useEffect(() => {
    const getCountriesList = async () => {
      try {
        const countries = await CountriesList(1, 200);
        setAllCountries(countries.records);
      } catch (err) {
        throw err;
      }
    };

    const getCitiesList = async () => {
      try {
        const cities = await CitiesList(1, 500);
        setAllCities(cities.records);
      } catch (err) {
        throw err;
      }
    };

    getCitiesList();
    getCountriesList();
  }, []);

  useEffect(() => {
    const filterCities = allCities.filter(
      (city) => city.countryId == selectedCountry
    );
    setSomeCities(filterCities);
  }, [selectedCountry]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                margin: "1.5rem auto",
              }}
            >
              <Box sx={{ margin: "0.7rem auto", position: "relative" }}>
                <Avatar
                  src={
                    selectedImageFile
                      ? URL.createObjectURL(selectedImageFile)
                      : userAvatar
                  }
                  sx={{
                    width: 140,
                    height: 140,

                    position: "relative",
                  }}
                />
                <Tooltip title="change avatar">
                  <PhotoCameraIcon
                    onClick={handleCameraIconClick}
                    sx={{
                      position: "absolute",
                      bottom: "1%",
                      right: "14%",
                      background: "white",
                      padding: "0.2rem",
                      borderRadius: "50%",
                      fontSize: "1.6rem",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </Box>

              <input
                type="file"
                name="AvtarImg"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue(
                    "avtarImg",
                    e.currentTarget.files && e.currentTarget.files[0]
                  );
                  handleImageChange(e);
                }}
                style={{ margin: "0.7rem auto", display: "none" }}
                ref={fileInputRef}
              />
              <Typography
                sx={{
                  margin: "0rem auto",
                  fontSize: " 1.5rem",
                  fontWeight: "bold",
                }}
              >
                {userData.firstName + " " + userData.lastName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ margin: "auto 2rem", padding: ["1rem", "3rem", "5rem"] }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName && !!formik.errors.firstName
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Mobile Number"
                    name="mobileNumber"
                    fullWidth
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobileNumber &&
                      !!formik.errors.mobileNumber
                    }
                    helperText={
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                    }
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="BirthDate"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    type="date"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    label="ProfileText"
                    name="profileText"
                    value={formik.values.profileText}
                    onChange={formik.handleChange}
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Countries
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="countries"
                      name="country"
                      value={formik.values.country}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setSelectedCountry(e.target.value as number);
                      }}
                    >
                      {allCountries.map((country) => (
                        <MenuItem
                          key={country.countryId}
                          value={country.countryId}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      sx={{ display: "none" }}
                      label="Email"
                      name="email"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Cities
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                    >
                      {someCities.map((city) => (
                        <MenuItem key={city.cityId} value={city.cityId}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "1rem auto", width: ["120px", "200px"] }}
                >
                  save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileDialog;
