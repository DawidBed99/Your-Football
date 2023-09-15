import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Arrow from "@mui/icons-material/KeyboardDoubleArrowRight";
import NavBar from "./MScomponents/NavBar";
import LeftBar from "./MScomponents/LeftBar";
import { useNavigate } from "react-router-dom";

export default function Users(props) {
  const setMode = props.setMode;
  const mode = props.mode;
  const navigate = useNavigate();
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

  const userList = users.map((user) => {
    return (
      <Box mt="20px" width="50%">
        <Card sx={{ mb: "20px" }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="profile picture"
                src={user.profilePicture}
              ></Avatar>
            }
            title={user.login}
          />

          <CardContent>
            <Button
              endIcon={<Arrow sx={{ width: "20px", height: "20px" }} />}
              variant="contained"
              sx={{ fontSize: "14px" }}
              onClick={() => navigate(`/users/${user._id}`)}
            >
              Go to profile details
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  });
  return (
    <Box bgcolor="background.default" color="text.primary">
      <NavBar />
      <Stack direction="row">
        <LeftBar setMode={setMode} mode={mode} />
        <Divider
          position="fixed"
          orientation="vertical"
          flexItem
          sx={{
            position: "absolute",
            left: "300px",
            height: "85%",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          flex={12}
          mt="40px"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          {userList}
        </Box>
      </Stack>
    </Box>
  );
}
