import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import UserContext from "../../../../Context/UserContext";

const ProfileAbout: React.FC = () => {
  const { userData } = useContext(UserContext);

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: "white",padding:"10px",borderRadius:"10px" }}>
        <Typography>{userData.profileText}</Typography>
        <Typography>
          <HomeIcon /> I'm From {userData.address}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default ProfileAbout;  
