import React, { useState, useContext, ChangeEvent } from "react";
import { styled, alpha } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarIcons from "../Sidebar/SidebarIcons";
import HeaderIcons from "./HeaderIcons";
import UserContext from "../../Context/UserContext";
import BharatBookLogo from "../../assets/BharatBook.png";
import { useNavigate } from "react-router-dom";
import { SEARCH_OPTIONS } from "../../Utils/enums";
import Page from "../../Utils/route";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "black",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#eaeaea",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userData, userAvatar } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const options = [
    SEARCH_OPTIONS.NOTIFICATION,
    SEARCH_OPTIONS.HOME,
    SEARCH_OPTIONS.FRIENDS_REQUESTS,
    SEARCH_OPTIONS.PROFILE_PAGE,
    SEARCH_OPTIONS.FRIENDS_SUGGESTIONS,
    SEARCH_OPTIONS.YOUR_FRIENDS,
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchS = e.target.value;
    setSearchString(searchS);

    if (searchS) {
      const filteredSuggestions = options.filter((option) =>
        option.toLowerCase().includes(searchS.toLowerCase())
      );
      setSearchSuggestions(filteredSuggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleMenuItemClick = (menuItem: string) => {
    switch (menuItem) {
      case SEARCH_OPTIONS.NOTIFICATION:
        navigate(Page.NOTIFICATION_PAGE);
        break;
      case SEARCH_OPTIONS.FRIENDS_REQUESTS:
        navigate(Page.FRIENDS_PAGE);
        break;
      case SEARCH_OPTIONS.FRIENDS_SUGGESTIONS:
        navigate(Page.SUGGESTED_PAGES);
        break;
      case SEARCH_OPTIONS.YOUR_FRIENDS:
        navigate(Page.YOUR_FRIENDS);
        break;
      case SEARCH_OPTIONS.HOME:
        navigate(Page.HOME_PAGE);
        break;
      case SEARCH_OPTIONS.PROFILE_PAGE:
        navigate(Page.PROFILE_PAGE);
        break;
      default:
        break;
    }
    setSearchString("");
    setSearchSuggestions([]);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = <SidebarIcons />;

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          component={Link}
          to={Page.PROFILE_PAGE}
        >
          <Avatar src={userAvatar} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const hoverIcon = {
    "&:hover": {
      background: "transparent",
    },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#f9f9f9" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: ["flex", "flex", "none"] }}
            >
              <MenuIcon sx={{ fontSize: "2rem", color: "gray" }} />
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="default"
              sx={{ mr: 2 }}
            >
              <Avatar
                src={BharatBookLogo}
                sx={{ fontSize: "3rem", color: "#2e81f4" }}
              />
            </IconButton>

            <Search
              sx={{
                borderRadius: "50px",
                backgroundColor: "#eaeaea",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleInputChange}
                value={searchString}
              />
            </Search>

            {searchSuggestions.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "130px",
                  width: "195px",
                }}
              >
                <Paper>
                  {searchSuggestions.map((suggestion) => (
                    <MenuItem
                      key={suggestion}
                      onClick={() => handleMenuItemClick(suggestion)}
                    >
                      {suggestion}
                    </MenuItem>
                  ))}
                </Paper>
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: ["none", "none", "flex"] }}>
              <HeaderIcons />
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: ["none", "none", "flex"] }}>
              <IconButton
                sx={{
                  ...hoverIcon,
                  display: {
                    md: "none",
                    lg: "flex",
                  },
                }}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="default"
                component={Link}
                to={Page.PROFILE_PAGE}
              >
                <Avatar src={userAvatar} sx={{ marginRight: "0.3rem" }} />
                <small>{userData.firstName + " " + userData.lastName}</small>
              </IconButton>
              <IconButton size="large" edge="end" color="default">
                <AddIcon />
              </IconButton>
              <IconButton size="large" edge="end" color="default">
                <ForumIcon />
              </IconButton>

              <IconButton size="large" edge="end" color="default">
                <ExpandMoreIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="default"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
