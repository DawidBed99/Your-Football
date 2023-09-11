import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Switch,
  Divider,
} from "@mui/material";
import React from "react";
import Home from "@mui/icons-material/Home";
import ModeNight from "@mui/icons-material/ModeNight";
import Person from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
function LeftBar({mode, setMode}) {
  return (
    <Box flex={"2"} padding={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding sx={{ mt: 3 }}>
            <ListItemButton component="a" href="/mainSite/Posts">
              <ListItemIcon>
                <Home fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ mt: 3 }}>
            <ListItemButton component="a" href="/users">
              <ListItemIcon>
                <Person fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <Divider />
          {/* <ListItem disablePadding sx={{ mt: 3 }}>
            <ListItemButton component="a" href="/leagues">
              <ListItemIcon>
                <GroupsIcon fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText primary="Football Leagues" />
            </ListItemButton>
          </ListItem>
          <Divider /> */}
          <ListItem disablePadding sx={{ mt: 3 }}>
            <ListItemButton component="a">
              <ListItemIcon>
                <ModeNight fontSize="large" sx={{ color: "#ffaf00" }} />
              </ListItemIcon>
              <Switch onChange={e=> setMode(mode==="light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
}

export default LeftBar;
