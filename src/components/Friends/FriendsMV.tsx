import React,{CSSProperties} from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import FriendRequests from './FriendRequestMV';

const ButtonStyles = {
    margin: "0.2rem 0.2rem 0.8rem 0.2rem",
    background: "#e5e5e5",
    borderRadius: "999px",
    padding: "0.6rem",
    "&:hover": {
        background: "#e5e5e5",
    },
}
const buttonTypo:CSSProperties = {
    textTransform: "none",
    color: "black",
    display: "flex",
    alignItems: "center",
}
const SingleFriendsMV = () => {
    return (
        <React.Fragment>
            <Box>
                <Grid >
                    <Grid item sx={{ display: "flex", justifyContent: "space-between" }} >

                        <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                            Friends
                        </Typography>
                        <SearchIcon sx={{ fontSize: "26px", margin: "0.2rem" }} />
                    </Grid>

                    <Grid>
                        <Button sx={ButtonStyles}>
                            <Typography sx={buttonTypo}>Suggestions</Typography>
                        </Button>
                        <Button sx={ButtonStyles}>
                            <Typography sx={buttonTypo}>Your Friends </Typography>
                        </Button>
                    </Grid>
                </Grid>

            </Box>
            <Divider />
            <Box>

                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>Friend Requests</Typography>
                    <Typography sx={{ color: "#1877f2" }}>See All</Typography>
                </Grid>

                <FriendRequests />
                <FriendRequests />
                <FriendRequests />
                <FriendRequests />
                <FriendRequests />

                <Divider />
            </Box>
        </React.Fragment>

    )
}

export default SingleFriendsMV
