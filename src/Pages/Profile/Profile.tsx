import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FaceIcon from "@mui/icons-material/Face";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header/Header";
import UserContext from "../../Context/UserContext";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import ProfileDialog from "./ProfileDialog/ProfileDialog";
import ProfilePost from "./ProfileDetails/ProfilePosts/ProfilePost";
import ProfileAbout from "./ProfileDetails/ProfileAbout/ProfileAbout";
import { IUserRequest } from "../../Models/FriendsRequest";
import { getFriendListForUser } from "../../Services/AllApiRequests/UserRequest";
import { getPostByUserId } from "../../Services/AllApiRequests/SocialActivity";
import { IPost } from "../../Models/PostC";
import ProfileFriends from "./ProfileDetails/ProfileFriends/ProfileFriends";
import useLastItemObserver from "../../Utils/helper";
import { SuggestLoader } from "../../components/Loaders/Loaders";

const Profile: React.FC = () => {
  const { userAvatar } = useContext(UserContext);

  const [value, setValue] = React.useState<string>("1");
  const [open, setOpen] = React.useState<boolean>(false);
  const [friendsCount, setFriendsCount] = useState<number>(0);
  const [userFriendsData, setUserFriendsData] = useState<IUserRequest[]>([]);
  const [postData, setPostData] = useState<IPost[]>([]);
  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [hasPostMore, setHasPostMore] = useState<boolean>(false);
  const [postPgNum, setpostPgNum] = useState<number>(1);

  const postsPgSize = 1;

  const lastPost = useLastItemObserver(loadingPost, hasPostMore, setpostPgNum);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editProfileBtn = {
    padding: "0.5rem",
    margin: ["0.3rem", "0.3rem", "0.3rem", "0.5rem"],
    backgroundColor: "#3da5ef",
    color: "black",
    "&:hover": {
      color: "black",
      backgroundColor: "#3da5ef",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  };
  const profileButtonIcon = {
    fontSize: "1.4rem",
  };
  const ButtonTypo = {
    fontSize: ["0.7rem", "0.7rem", "0.8rem", "0.8rem"],
    display: ["none", "block"],
  };
  const tabLabels = {
    textTransform: "none",
    fontSize: "1.2rem",
  };

  useEffect(() => {
    const getFriendsList = async () => {
      try {
        const getTotalFriends = await getFriendListForUser(1, 100, 1, 0);
        if (getTotalFriends) {
          setUserFriendsData(getTotalFriends.records);
          setFriendsCount(getTotalFriends.totalCount);
        }
      } catch (err) {
        throw err;
      }
    };
    getFriendsList();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const Posts = await getPostByUserId(postPgNum, postsPgSize, true);
        if (Posts) {
          setPostData((prevPosts) => [...prevPosts, ...Posts.records]);
        }
        setHasPostMore(Posts.records.length > 0);
        setLoadingPost(false);
      } catch (err) {
        throw err;
      }
    };
    fetchPost();
  }, [postPgNum]);

  const RemovePost = (id: number) => {
    const UpdatedPosts = postData.filter((post) => post.postId != id);
    setPostData(UpdatedPosts);
  };

  const DeletePost = (id: number) => {
    const updatedPostData = postData.filter((post) => post.postId != id);
    setPostData(updatedPostData);
  };

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        sx={{
          maxHeight: "100vh",
          overflow: "scroll",
          backgroundColor: "#f2f8f9",
        }}
      >
        <Grid item xs={12} sm={12} md={9} sx={{ margin: "auto" }}>
          <Box
            sx={{
              height: ["250px", "350px", "400px"],
              backgroundColor: "lightgray",
              display: "flex",
              borderRadius: "10px",
              backgroundImage: `url("https://shorturl.at/cnJQV")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              objectFit: "contain",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "1rem",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <FaceIcon />
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "none",
                  margin: "0 0.2rem",
                  display: ["none", "none", "block"],
                }}
              >
                {" "}
                Create With Avtar
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <CameraAltIcon />{" "}
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "none",
                  margin: "0 0.2rem",
                  display: ["none", "none", "block"],
                }}
              >
                Add Cover Photo
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          justifyContent="center"
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            margin: "1rem auto",
            width: "95%",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Avatar
                src={userAvatar}
                sx={{
                  height: [130, 160, 180, 200],
                  width: [130, 160, 180, 200],
                  margin: "-3rem auto 0 auto",
                  border: "2px solid white",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={9}
              sx={{
                display: "flex",
                flexDirection: ["column", "column"],
                justifyContent: ["center", "center", "start", "start"],
                alignItems: ["center", "center", "start", "start"],
              }}
            >
              <ProfileDetails
                totalFriends={friendsCount}
                allFriendsData={userFriendsData}
              />

              <Box
                sx={{
                  display: "flex",
                  // flexDirection: ["column", "column", "column", "row"],
                }}
              >
                <Button
                  onClick={handleClickOpen}
                  disableRipple
                  sx={editProfileBtn}
                >
                  <EditIcon sx={profileButtonIcon} />{" "}
                  <Typography
                    sx={{
                      ...ButtonTypo,
                      marginLeft: "0.3rem",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Edit Profile
                  </Typography>
                </Button>

                <ProfileDialog handleDialogClose={handleClose} isOpen={open} />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Divider />
        <Box
          sx={{
            width: ["95%", "95%", "75%"],
            typography: "body1",
            margin: "auto",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="about" value="1" sx={tabLabels} />
                <Tab label="friends" value="2" sx={tabLabels} />
                <Tab label="posts" value="3" sx={tabLabels} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProfileAbout />
            </TabPanel>
            <TabPanel value="2">
              <ProfileFriends />
            </TabPanel>
            <TabPanel value="3" sx={{ padding: ["0.3rem", "1.5rem"] }}>
              <ProfilePost
                postReference={lastPost}
                UserPostDetails={postData}
                RemoveUserPost={RemovePost}
                CancelUserPost={DeletePost}
              />

              {loadingPost && (
                <Grid
                  sx={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SuggestLoader />
                </Grid>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
