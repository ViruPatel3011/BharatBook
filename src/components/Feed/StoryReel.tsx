import React, { CSSProperties, useRef, useState, useEffect } from "react";
import UserStory from "./UserStory";
import CreateStory from "./CreateStory";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { getUserStories } from "../../Services/AllApiRequests/Story";
import { IStory } from "../../Models/Story";

const styleTypo: CSSProperties = {
  margin: "0rem 1rem 0rem 1rem",
  fontSize: "20px",
  fontWeight: "600",
  padding: "1.2rem 0.7rem 0rem 0.7rem",
  cursor: "pointer",
};

const sliderStoryBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  background: "white",
  color: "black",
  padding: "0.8rem",
  border: "1px solid gray",
};
const StoryReel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(false);
  const [userStories, setUserStories] = useState<IStory[]>([]);

  const scrollLeft = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const scrollAmount = Math.floor(containerWidth / 146) * 146;
    containerRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const scrollAmount = Math.floor(containerWidth / 146) * 146;
    containerRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getStoriesforUser = async () => {
      const storyData = await getUserStories(1, 100);
      setUserStories(storyData.records);
    };

    getStoriesforUser();
  }, []);

  const apendNewStory = (storyData: IStory) => {
    const findStory = userStories.filter(
      (story) => story.userId == storyData.userId
    );

    if (findStory.length > 0) {
      setUserStories((StoriesList) =>
        StoriesList.map((story) => {
          if (story.userId === storyData.userId) {
            return {
              ...story,
              stories: [storyData.stories[0], ...story.stories],
            };
          }
          return story;
        })
      );
    } else {
      setUserStories((prevStories) => [storyData, ...prevStories]);
    }
  };

  const RemoveStory = async (id: number) => {
    const updatedStories = userStories.map((story) => {
      const updatesStoryMedia = story.stories.filter(
        (storyMedia) => storyMedia.storyId !== id
      );
      return {
        ...story,
        stories: updatesStoryMedia,
      };
    });
    setUserStories(updatedStories);
  };

  useEffect(() => {
    const checkButtonVisibility = () => {
      const containerWidth = containerRef.current?.clientWidth || 0;
      const totalStoriesWidth = userStories.length * 146;
      setShowLeftButton(containerWidth < totalStoriesWidth);
      setShowRightButton(containerWidth < totalStoriesWidth);
    };

    checkButtonVisibility();
    window.addEventListener("resize", checkButtonVisibility);
    return () => {
      window.removeEventListener("resize", checkButtonVisibility);
    };
  }, [userStories]);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography sx={styleTypo}>Stories</Typography>
      </Box>
      <Grid container spacing={0.5} sx={{ position: "relative" }}>
        <Grid
          ref={containerRef}
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <CreateStory appendNewUserStories={apendNewStory} />
          {userStories.map((story, index) => (
            <UserStory
              key={index}
              story={story}
              handleRemoveStory={RemoveStory}
            />
          ))}
        </Grid>

        {showLeftButton && (
          <IconButton
            onClick={scrollLeft}
            sx={{
              ...sliderStoryBtn,
              left: 0,
              margin: "0 1.3rem",

              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
          >
            <KeyboardBackspaceOutlinedIcon />
          </IconButton>
        )}

        {showRightButton && (
          <IconButton
            onClick={scrollRight}
            sx={{
              ...sliderStoryBtn,
              right: 0,
              margin: "0 1.3rem",
              "&:hover": {
                background: "white",
                color: "black",
              },
            }}
          >
            <EastOutlinedIcon />
          </IconButton>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default StoryReel;
