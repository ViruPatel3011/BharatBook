import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import MobileStepper from "@mui/material/MobileStepper";
import { Button, Skeleton } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface PostMediasProps {
  medias: any;
  postPath: string[];
}
const PostMedias: React.FC<PostMediasProps> = (props) => {
  const { medias, postPath } = props;
  const theme = useTheme();
  const [isPostImageLoading, setIsPostImageLoading] = useState<boolean>(true);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  
  const maxSteps = medias.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      {postPath.length > 0 ? (
        !(medias.length > 0) ? (
          isPostImageLoading && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={250}
              sx={{
                position: "relative",
                display: "block",
              }}
            />
          )
        ) : (
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {medias.map((postimage, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <CardMedia
                    component="img"
                    height="250"
                    image={`data:image/png;base64, ${postimage}`}
                    sx={{
                      position: "relative",
                      display: isPostImageLoading ? "none" : "block",
                      objectFit: "contain",
                      backgroundColor: "black",
                    }}
                    onLoad={() => setIsPostImageLoading(false)}
                    // onClick={() => handleCardMediaClick(0)}
                  />
                ) : null}
              </div>
            ))}
          </SwipeableViews>
        )
      ) : null}
      {medias.length > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      )}
    </React.Fragment>
  );
};

export default PostMedias;
