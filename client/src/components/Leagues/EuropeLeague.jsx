import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Divider,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./MScomponents/NavBar";
import LeftBar from "./MScomponents/LeftBar";



function EuropeLeague() {
  return (
    <Box>
      <NavBar />
      <Stack direction={"row"} span={2}>
      <LeftBar />
      <Divider position="fixed" orientation="vertical" flexItem sx={{position:"absolute", left:"300px", height:"85%", display:{xs:"none", md:"block"} }} />
      </Stack>
    </Box>
  );
}

export default EuropeLeague;
