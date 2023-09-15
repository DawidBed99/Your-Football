import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function RightBar() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5000/users`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const users = await response.json();
      setUsers(users);
    }

    getUsers();

    return;
  }, [users.length]);

  const usersAvatars = users.map((user) => {
    return (
      <Avatar src={user.profilePicture}></Avatar>
    );
  });

  return (
    <Box flex={"2"} padding={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed" ml="60px">
        <Stack mt={3} direction="column">
          <Typography textAlign="center" fontSize="36px">
            Users:
          </Typography>
          <Box display="flex" justifyContent="center">
            <AvatarGroup max={6} sx={{ margin: "1vw" }}>
            {usersAvatars}
            </AvatarGroup>
          </Box>
          <Divider />
        </Stack>
      </Box>
    </Box>
  );
}

export default RightBar;
