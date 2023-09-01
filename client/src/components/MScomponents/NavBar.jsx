import styled from "@emotion/styled";
import {
  Box,
  AppBar,
  Avatar,
  Badge,
  Icon,
  InputBase,
  Toolbar,
  Typography,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Mail, Notifications } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  marginRight: "20px",
  borderRadius: "2px",
  width: "70%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "30px",
  justifyContent: "flex-end",
  width: "250px",
  alignItems: "center",
  marginRight: "50px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
function NavBar() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          to="/mainSite/posts"
          component={RouterLink}
          width="400px"
          variant="h3"
          padding={2}
          sx={{
            display: {
              xs: "none",
              sm: "block",
              color: "white",
              textDecoration: "none",
            },
          }}
        >
          Your Football
        </Typography>
        <Icon
          to="/mainSite/posts"
          component={RouterLink}
          sx={{
            width: "50px",
            height: "50px",
            display: { xs: "block", sm: "none", color: "white" },
            mr: "10px",
          }}
        >
          <SportsSoccerIcon
            sx={{ width: "50px", height: "50px" }}
          ></SportsSoccerIcon>
        </Icon>
        <Search>
          <InputBase sx={{ width: "100%" }} placeholder="Search...." />
        </Search>
        <UserBox>
          <Avatar
            onClick={handleClick}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"
          ></Avatar>
          <Typography variant="span">Messi</Typography>
        </UserBox>
        <Icons>
          {/* <Badge badgeContent={4} color="error" sx={{display:{xs:"none", sm:"block"}}}>
                <Mail />
            </Badge>
            
            <Badge  badgeContent={4} color="error" sx={{display:{xs:"none", sm:"block"}}}>
                <Notifications  />
            </Badge> */}
          <Avatar
            onClick={handleClick}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"
          ></Avatar>
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          to="/profileDetails"
          component={RouterLink}
          onClick={handleClose}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
