import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import CollectionsIcon from "@mui/icons-material/Collections";
import { REQUIRED_ERROR, VALIDATION_MESSAGE } from "../../Utils/enums";
import { addNewStory } from "../../Services/AllApiRequests/Story";
import toastSuccess from "../../Utils/toast";
import { TOASTER_SUCCESS_MSG } from "../../Utils/enums";

import { useFormik } from "formik";
import * as Yup from "yup";

interface UserStoryProps {
  appendNewUserStories: any;
}
const CreateStory: React.FC<UserStoryProps> = ({ appendNewUserStories }) => {
  interface FormValues {
    storyDescription: string;
    storyImg: string;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [selectedImageName, setSelectedImageName] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      storyDescription: "",
      storyImg: "",
    },
    validationSchema: Yup.object().shape({
      storyDescription: Yup.string().required(REQUIRED_ERROR.STORY_TEXT),
      storyImg: Yup.mixed()
        .test("fileSize", VALIDATION_MESSAGE.IMAGE_SIZE, (value) => {
          if (value && value.size) {
            return value.size <= 2 * 1024 * 1024;
          }
          return true;
        })
        .required(REQUIRED_ERROR.IMAGE),
    }),
    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const { storyDescription, storyImg } = values;
    try {
      const formData = new FormData();
      formData.append("Description", storyDescription);
      if (storyImg) {
        formData.append("Images", storyImg);
      }
      const response = await addNewStory(formData);
      appendNewUserStories(response);
      toastSuccess(TOASTER_SUCCESS_MSG.STORY_UPLOADED);
    } catch (error) {
      console.error("Failed to add Story:", error);
    }
    setSelectedImageName("");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setSelectedImageName("");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid>
        <Paper
          onClick={handleClickOpen}
          sx={{
            position: "relative",
            cursor: "pointer",
            height: 140,
            width: 100,
            margin: "30px",
            marginRight: "5px",
            padding: "15px 15px",
            borderRadius: "15px",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("https://shorturl.at/rwB46")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.07)",
            },
          }}
        >
          <AddIcon
            sx={{
              color: "white",
              borderRadius: "50%",
              border: "2px solid white",
              padding: "10px",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              bottom: 10,
              left: 10,
              fontWeight: "600",
              color: "white",
            }}
          >
            Add Story
          </Typography>
        </Paper>

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{ maxHeight: "650px", maxWidth: "650px", margin: "auto" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Add New Story</DialogTitle>
            <DialogContent sx={{ width: "500px", height: "140px" }}>
              <Box>
                <TextField
                  name="storyDescription"
                  label="Story Text"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={formik.values.storyDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.storyDescription &&
                    !!formik.errors.storyDescription
                  }
                  helperText={
                    formik.touched.storyDescription &&
                    formik.errors.storyDescription
                  }
                />
                {selectedImageName && (
                  <Typography
                    variant="body2"
                    sx={{ marginTop: "8px", display: "block" }}
                  >
                    {selectedImageName}
                  </Typography>
                )}
                <Box sx={{ marginTop: "1rem" }}>
                  <label htmlFor="story-image-upload">
                    <input
                      id="story-image-upload"
                      name="storyImg"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file =
                          e.currentTarget.files && e.currentTarget.files[0];
                        formik.setFieldValue("storyImg", file as File);

                        if (file) {
                          setSelectedImageName(file.name);
                        } else {
                          setSelectedImageName("");
                        }
                      }}
                    />

                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Button
                        variant="outlined"
                        component="span"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#16a4e2",
                          color: "white",
                          margin: "0 0.5rem",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "#16a4e2",
                          },
                        }}
                      >
                        <CollectionsIcon sx={{ marginRight: "0.3rem" }} />
                        Upload Image
                      </Button>
                    </Box>

                    {formik.touched.storyImg && formik.errors.storyImg && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ marginTop: "8px", display: "block" }}
                      >
                        {formik.errors.storyImg}
                      </Typography>
                    )}
                  </label>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{ textTransform: "none" }}
              >
                <Typography>Cancel Story</Typography>
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Share Your Story
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default CreateStory;
