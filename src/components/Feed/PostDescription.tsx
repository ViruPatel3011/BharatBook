import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserContext from "../../Context/UserContext";
import toastSuccess from "../../Utils/toast";
import {
  REQUIRED_ERROR,
  VALIDATION_MESSAGE,
  TOASTER_SUCCESS_MSG,
} from "../../Utils/enums";
import { IPost } from "../../Models/PostC";
import { resizeImage } from "../../Utils/helper";
import { addPost } from "../../Services/AllApiRequests/SocialActivity";

interface FormValues {
  description: string;
  image: File[];
}

const PostDescription = ({
  onSharePostData,
}: {
  onSharePostData: (response: IPost) => void;
}) => {
  const { userData, userAvatar } = useContext(UserContext);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const formik = useFormik({
    initialValues: {
      description: "",
      image: [],
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required(REQUIRED_ERROR.POST_DESCRIPTION),
      image: Yup.array()
        .of(
          Yup.mixed().test(
            "fileSize",
            VALIDATION_MESSAGE.IMAGE_SIZE,
            (value) => {
              if (value && value.size) {
                return value.size <= 2 * 1024 * 1024;
              }
              return true;
            }
          )
        )
        .nullable(),
    }),
    onSubmit(values, { resetForm }) {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async (values: FormValues) => {
    // e.preventDefault();
    const { description, image } = values;

    try {
      const formData = new FormData();
      formData.append("UserId", userData.userId);
      formData.append("Description", description);

      if (image && image.length > 0) {
        const resizedImages = await Promise.all(
          image.map((file) => resizeImage(file))
        );

        resizedImages.forEach((resizedImage) => {
          formData.append("Images", resizedImage);
        });
      }

      setSelectedImages([]);
      const response = await addPost(formData);
      console.log("Post added successfully!");
      onSharePostData(response);
      toastSuccess(TOASTER_SUCCESS_MSG.POST_UPLOADED);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ width: ["90%", "75%", "80%", "60%"], margin: "10px auto" }}>
        <Box
          sx={{
            display: "flex",
            padding: "0.3rem 0.5rem",
            margin: "1rem 1rem",
          }}
        >
          <Avatar src={userAvatar} />
          <Typography
            sx={{
              fontSize: ["17px", "14px", "20px"],
              fontWeight: 600,
              margin: ["0.3rem 0.5rem", "0.3rem 0.5rem", "0.3rem 0.5rem"],
            }}
          >
            {userData.firstName + " " + userData.lastName}
          </Typography>
          <Typography
            sx={{ padding: "0.5rem 0.2rem", display: ["none", "flex", "flex"] }}
          >
            (What's on your mind?)
          </Typography>
        </Box>
        <CardContent>
          <Box>
            <TextField
              name="description"
              label="Description"
              variant="standard"
              sx={{ width: "100%" }}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && !!formik.errors.description}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            {selectedImages.length > 0 && (
              <>
                {selectedImages.map((image, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ marginTop: "8px", display: "block" }}
                  >
                    {image.name}
                  </Typography>
                ))}
              </>
            )}
            <Box sx={{ marginTop: "1rem" }}>
              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = Array.from(e.currentTarget.files);
                    formik.setFieldValue("image", files);
                    setSelectedImages(files);
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

                {formik.touched.image && formik.errors.image && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ marginTop: "8px", display: "block" }}
                  >
                    {formik.errors.image}
                  </Typography>
                )}
              </label>
            </Box>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ margin: "0 0.7rem 0.5rem 0", float: "right" }}
            >
              Share Post
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default PostDescription;
