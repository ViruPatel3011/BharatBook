import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
// import LinearProgress from "@mui/material/LinearProgress";
import { IStory } from "../../Models/Story";
import UserSeenGrid from "./UserSeenGrid";
import UserContext from "../../Context/UserContext";
import { IStoryView } from "../../Models/StoryView";
import {
  DeleteStory,
  StorySeen,
  StoryViews,
} from "../../Services/AllApiRequests/Story";
import {
  getStoriesImages,
  getAvatarImage,
} from "../../Services/AllApiRequests/Account";

interface StoryProps {
  story: IStory;
  handleRemoveStory: any;
}

interface StoryMediaProps {
  Image: string;
  CreatedAt: string;
  IsSeen: boolean;
  WrittenText: string;
  StoryId: number;
}

const UserStory: React.FC<StoryProps> = ({ story, handleRemoveStory }) => {
  const { userData } = useContext(UserContext);

  const [storyAvatar, setStoryAvatar] = useState<string | undefined>("");
  const [storyImages, setStoryImages] = useState<StoryMediaProps[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [progressInterval, setProgressInterval] = useState<number | undefined>(
    undefined
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [showStoryModel, setShowStoryModel] = useState<boolean>(false);
  const [storyViews, setStoryViews] = useState<IStoryView[]>([]);

  useEffect(() => {
    const getStoriesAvtar = async () => {
      if (story.avatar) {
        const storyImg = await getAvatarImage(story.avatar);

        if (storyImg) {
          setStoryAvatar(storyImg);
        }
      }
    };

    const getStoryImages = async () => {
      const storyImagesPromise = story.stories.map(async (story) => {
        if (story.path != null) {
          const storyUrl = await getStoriesImages(story.path);
          return {
            Image: storyUrl,
            CreatedAt: story.createdAt,
            IsSeen: story.isSeen,
            WrittenText: story.text,
            StoryId: story.storyId,
          };
        }
      });

      try {
        const storyData = await Promise.all(storyImagesPromise);
        setStoryImages(storyData);
      } catch (err) {
        throw err;
      }
    };

    getStoryImages();
    getStoriesAvtar();
  }, [story.avatar, story.stories]);

  const handleDialogOpen = async (index: number) => {
    setSelectedImageIndex(index);
    setDialogOpen(true);
    storySeenModel(index);
  };

  const storySeenModel = async (index: number) => {
    if (!storyImages[index].IsSeen) {
      await StorySeen(storyImages[index].StoryId);
    }
  };

  const handleDialogClose = () => {
    clearInterval(progressInterval);
    // setProgress(0);
    setProgressInterval(undefined);
    setDialogOpen(false);
    setSelectedImageIndex(0);
    setShowStoryModel(false);
  };

  const handleLeftSlide = () => {
    if (!(selectedImageIndex === 0)) {
      setSelectedImageIndex((prev) => prev - 1);
    }
  };

  const handleRightSlide = () => {
    if (selectedImageIndex < storyImages.length - 1) {
      setSelectedImageIndex((prev) => prev + 1);
      storySeenModel(selectedImageIndex);
    }
  };

  const handleStoryViewsClick = async (storyId: number) => {
    setShowStoryModel(!showStoryModel);

    try {
      const viewsData = await StoryViews(1, 100, storyId);
      if (viewsData) {
        setStoryViews(viewsData.record.responseModel);
      }
    } catch (err) {
      console.error("Error in story views:", err);
    }
  };

  const deleteStory = async (storyId: number) => {
    try {
      const response = await DeleteStory(storyId);
      handleRemoveStory(storyId);
    } catch (err) {
      throw err;
    }
  };

  return (
    <React.Fragment>
      <Grid>
        <Paper
          onClick={() => handleDialogOpen(0)}
          sx={{
            position: "relative",
            cursor: "pointer",
            height: 140,
            width: 100,
            margin: "30px 5px",
            padding: "15px 15px",
            borderRadius: "15px",
            backgroundImage: ` url("data:image/png;base64,${
              storyImages.length > 0 && storyImages[selectedImageIndex].Image
            }")`,
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
          <Avatar
            src={`data:image/png;base64,${storyAvatar}`}
            alt="Avatar"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              border: "2px solid white",
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
            {story.userName}
          </Typography>
        </Paper>
      </Grid>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            height: "80vh",
            padding: "1rem 0",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", flexDirection: "column" }}>
          {/* <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flexGrow: 1, marginLeft: "1rem" }}
          /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar src={`data:image/png;base64,${storyAvatar}`} />
              <Typography sx={{ margin: "auto 1rem", fontSize: "1.2rem" }}>
                {story.userName}
              </Typography>
            </Box>

            <IconButton onClick={handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ position: "relative" }}>
          {/* {showText ? (
            <Box sx={{ height: "100%", width: "100%" }}>
              <Typography variant="h5" color="textPrimary">
                {story.stories[selectedImageIndex].text}
              </Typography>
            </Box>
          ) : ( */}
          <img
            src={`data:image/png;base64,${
              storyImages.length > 0 && storyImages[selectedImageIndex].Image
            }`}
            alt="Story"
            style={{ width: "100%", height: "100%" }}
          />
          {/* )} */}
          <Button
            disableRipple
            sx={{ position: "absolute", left: "1rem", height: "100%" }}
            onClick={handleLeftSlide}
          ></Button>
          <Button
            disableRipple
            sx={{ position: "absolute", right: "1rem", height: "100%" }}
            onClick={handleRightSlide}
          ></Button>
        </DialogContent>
        {userData.userId === story.userId && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              margin: "1rem",
              bottom: showStoryModel ? "49%" : 0,
              background: "#ffffff",
              padding: "0.5rem",
              borderRadius: "20px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            <Button
              onClick={() =>
                handleStoryViewsClick(storyImages[selectedImageIndex].StoryId)
              }
              sx={{ padding: "0px", textTransform: "none" }}
            >
              <VisibilityIcon sx={{ color: "black" }} />
              <Typography sx={{ color: "black" }}>Seen By</Typography>
            </Button>
          </Box>
        )}
        {showStoryModel && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "#daeef5",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              maxHeight: "400px",
              overflow: "scroll",
            }}
          >
            <Button
              onClick={() =>
                deleteStory(storyImages[selectedImageIndex].StoryId)
              }
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "2rem",
              }}
            >
              <DeleteIcon sx={{ fontSize: "1.7rem", color: "black" }} />
            </Button>
            {storyViews.map((view) => (
              <UserSeenGrid key={view.storyId} storyView={view} />
            ))}
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default UserStory;
