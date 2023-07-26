import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import userAvtarLogo from "../../assets/AvtarImage.jpg";
import MutualFriendsItem from "./MutualFriendsItem";
import { RequestType } from "../../Utils/const";
import {
  RequestReply,
  CancleRequest,
} from "../../Services/AllApiRequests/UserRequest";
import { getAvatarImage } from "../../Services/AllApiRequests/Account";
import { IUserRequest } from "../../Models/FriendsRequest";

const requestResponseTypo = {
  bordeRadius: "10px",
  background: "#9ae0ec",
  padding: "0.6rem",
  margin: "1.6rem 1rem 1rem 1rem",
};

interface RequestProps {
  request: IUserRequest;
  requestType: number;
  reference: any;
}
const SingleFriendRequest: React.FC<RequestProps> = ({
  request,
  requestType,
  reference,
}) => {
  const [userAvtar, setUserAvtar] = useState<string | undefined>("");
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [isCancelRequest, setIsCancelRequest] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAvtar = async () => {
      try {
        const requestAvtar =
          requestType === RequestType.RECEIVED
            ? request.fromAvatar
            : request.toAvatar;
        if (requestAvtar) {
          const fetchImage = await getAvatarImage(requestAvtar);
          setUserAvtar(fetchImage);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchUserAvtar();
  }, [request.fromAvatar, request.toAvatar, request.requestType]);

  const handleButtonClick = async (isAccepted: boolean) => {
    try {
      await RequestReply(request.requestId, isAccepted);
      if (isAccepted) {
        setIsAccepted(true);
      } else {
        setIsRejected(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await CancleRequest(request.requestId);
      setIsCancelRequest(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <Grid
        ref={reference}
        item
        sx={{
          marginBottom: "1rem",
          width: ["100%", "auto"],
        }}
      >
        <Card
          sx={{
            height: "100%",
            width: ["100%", 230],
            border: ["none", "1px solid #d5d5d5"],
            display: "flex",
            flexDirection: ["row", "column"],
          }}
        >
          <CardMedia
            sx={{
              height: [300, 250, 220, 220, 200],
              width: "100%",
              borderRadius: "5px",
              cursor: "pointer",
              display: ["none", "flex"],
            }}
            image={
              userAvtar ? `data:image/png;base64,${userAvtar}` : userAvtarLogo
            }
            title="Check Profile"
          />
          <Box
            sx={{
              display: ["flex", "none"],
              justifyContent: "center",
              width: "30%",
            }}
          >
            <Avatar
              sx={{ margin: "auto", width: 70, height: 70 }}
              src={`data:image/png;base64,${userAvtar}`}
            />
          </Box>
          {isAccepted ? (
            <Typography variant="body2" sx={requestResponseTypo}>
              We are now friends
            </Typography>
          ) : isRejected ? (
            <Typography variant="body2" sx={requestResponseTypo}>
              Your request Cancelled by the user
            </Typography>
          ) : (
            <>
              <Box sx={{ width: ["65%", "100%"] }}>
                <CardContent
                  sx={{
                    padding: "0 10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      margin: "0.5rem 0 0 0",
                      fontSize: " 18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {requestType === RequestType.RECEIVED
                      ? request.fromUserName
                      : request.toUserName}
                  </Typography>

                  <MutualFriendsItem
                    friendId={
                      requestType === RequestType.RECEIVED
                        ? request.fromUserId
                        : request.toUserId
                    }
                  />

                  {requestType === RequestType.RECEIVED ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: ["row", "column"],
                      }}
                    >
                      <Button
                        onClick={() => handleButtonClick(true)}
                        sx={{
                          width: ["45%", "95%"],
                          margin: ["0.2rem 0.5rem", "0.2rem 0"],
                          background: "#1877f2",
                          "&:hover": {
                            background: "#1877f2",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            textTransform: "none",
                            color: "white",
                            fontSize: [14, 18],
                          }}
                        >
                          Confirm
                        </Typography>
                      </Button>
                      <Button
                        onClick={() => handleButtonClick(false)}
                        sx={{
                          width: ["45%", "95%"],
                          margin: "0.3rem 0",
                          background: "#e5e5e5",
                          "&:hover": {
                            background: "#e5e5e5",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            textTransform: "none",
                            color: "black",
                            fontSize: [14, 18],
                          }}
                        >
                          Delete
                        </Typography>
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {!isCancelRequest ? (
                        <Button
                          onClick={handleCancelRequest}
                          sx={{
                            width: "100%",
                            margin: ["0.2rem 0.5rem", "0.2rem 0"],
                            background: "#e5e5e5",
                            "&:hover": {
                              background: "#e5e5e5",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "none",
                              color: "black",
                              fontSize: [12, 14],
                            }}
                          >
                            Cancel Request
                            <ClearIcon
                              sx={{ fontSize: ["1.2rem", "1.5rem"] }}
                            />
                          </Typography>
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            width: ["60%", "95%"],
                            margin: ["0.2rem 0.5rem", "0.2rem 0"],
                            background: "#a7f1f4",
                            "&:hover": {
                              background: "#a7f1f4",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textTransform: "none",
                              color: "black",
                              fontSize: [12, 14],
                            }}
                          >
                            You Can Add Now
                          </Typography>
                        </Button>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Box>
            </>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default SingleFriendRequest;
