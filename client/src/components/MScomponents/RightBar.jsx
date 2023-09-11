import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

function RightBar() {
  return (
    <Box flex={"2"} padding={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box position="fixed" ml="60px">
        <Stack mt={3} direction="column">
          <Typography textAlign="center" fontSize="36px">
            Users:
          </Typography>
          <Box display="flex" justifyContent="center">
            <AvatarGroup max={6} sx={{ margin: "1vw" }}>
              <Avatar alt="Remy Sharp">A</Avatar>
              <Avatar alt="Travis Howard">B</Avatar>
              <Avatar alt="Remy Sharp">A</Avatar>
              <Avatar alt="Travis Howard">B</Avatar>
              <Avatar alt="Remy Sharp">A</Avatar>
              <Avatar alt="Travis Howard">B</Avatar>
              <Avatar alt="Remy Sharp">A</Avatar>
              <Avatar alt="Travis Howard">B</Avatar>
            </AvatarGroup>
          </Box>
          <Divider />
        </Stack>
      </Box>
    </Box>
  );
}

export default RightBar;
