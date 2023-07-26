import React from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Avatar, Divider } from "@mui/material";
import Button from "@mui/material/Button";


const FriendRequests = () => {
    return (
        <React.Fragment>
            <Grid container sx={{ margin: "10px 0 0 0", padding: ["10px 0px", 0] }}>
                <Grid
                    item
                    xs={3.5}
                    sm={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Avatar
                        src="https://shorturl.at/rwB46"
                        sx={{ width: [100, 90], height: [100, 90] }}
                    ></Avatar>
                </Grid>

                <Grid item xs={7.5} sm={10} sx={{marginLeft:"1rem"}} >
                    <Grid sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Typography
                            color="initial"
                            sx={{ fontSize: [18, 16], fontWeight: 700, marginTop: 0.5 }}
                        >
                            John Doe
                        </Typography>
                        <Typography sx={{ fontSize: "12px", margin: "0.2rem" }}>1 Yr</Typography>
                    </Grid>
                    <Typography
                        color="initial"
                        sx={{
                            fontSize: [12, 13],
                            display: "flex",
                            alignItems: "center",
                            marginTop: 0.5,
                        }}
                    >
                        <Box sx={{ display: "flex", marginRight: 0.5 }}>
                            <Avatar
                                src="https://shorturl.at/rwB46"
                                sx={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: "-5px",
                                    zIndex: 15,
                                    border: "1px solid white",
                                }}
                            />
                            <Avatar
                                src="https://shorturl.at/rwB46"
                                sx={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: "-5px",
                                    zIndex: 20,
                                    border: "1px solid white",
                                }}
                            />
                        </Box>
                        49 Mutual Friends                        </Typography>
                    <Grid
                        container
                        sx={{ margin: "20px auto", justifyContent: "space-between" }}
                    >
                        <Grid item xs={5.8}>
                            <Button
                                sx={{
                                    width: "100%",
                                    background: "#1877f2",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        background: "#1877f2",
                                    },
                                    height: 45,
                                }}
                            >
                                <Typography
                                    sx={{
                                        textTransform: "none",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    Confirm
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={5.8}>
                            <Button
                                sx={{
                                    width: "100%",
                                    background: "#e5e5e5",
                                    borderRadius: "10px",

                                    "&:hover": {
                                        background: "#e5e5e5",
                                    },
                                    height: 45,
                                }}
                            >
                                <Typography
                                    sx={{
                                        textTransform: "none",
                                        color: "black",
                                        fontWeight: 700,
                                    }}
                                >
                                    Delete
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default FriendRequests
