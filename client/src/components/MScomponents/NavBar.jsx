import styled from "@emotion/styled";
import {
  Box,
  AppBar,
  Avatar,
  Icon,
  InputBase,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

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
function NavBar(props) {
  const navigate = useNavigate();
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
  const login = localStorage.getItem("login");
  const [profileDetails, setProfileDetails] = useState("");

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `http://localhost:5000/profileDetails/${login}`
      );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setProfileDetails(user);
    }
    if (login.length > 0) {
      getUser();
    }
  }, []);

  const [dispBut, setDispBut] = useState("none");
  const [dispBut2, setDispBut2] = useState("");
  useEffect(() => {
    if (login.length > 0) {
      setDispBut("");
      setDispBut2("none");
    } else {
      setDispBut("none");
      setDispBut2("");
    }
  });
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          to="/mainSite/posts"
          component={RouterLink}
          width="400px"
          variant="h4"
          padding={2}
          sx={{
            display: {
              xs: "none",
              md: "block",
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
            display: { xs: "block", md: "none", color: "white" },
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
        <Box>
          <Box>
            <UserBox>
              <Avatar
                onClick={handleClick}
                src={profileDetails.profilePicture}
              ></Avatar>
              <Typography variant="span">{profileDetails.login} </Typography>
            </UserBox>

            <Icons>
              <Avatar
                onClick={handleClick}
                src={profileDetails.profilePicture}
              ></Avatar>
            </Icons>
          </Box>
        </Box>
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
          sx={{ display: `${dispBut}` }}
          // to="/`${.props.login}`"
          // component={RouterLink}
          onClick={() => {
            handleClose();
            navigate(`/profileDetails/${props.login}`);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{ display: `${dispBut}` }}
          onClick={() => {
            handleClose();
            localStorage.setItem("login", "");
            navigate("/");
          }}
        >
          Logout
        </MenuItem>
        <MenuItem
          sx={{ display: `${dispBut2}` }}
          onClick={() => {
            handleClose();
            localStorage.setItem("login", "");
            navigate("/");
          }}
        >
          Sign in
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
