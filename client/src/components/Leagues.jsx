import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Alert,
  Avatar,
  Box,
  Divider,
  Modal,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./MScomponents/NavBar";
import LeftBar from "./MScomponents/LeftBar";
import "./profileImg.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function Leagues() {
  return (
    <Box>
      <NavBar />
      <LeftBar />
      <Divider />
      <Box flex={6}></Box>
    </Box>
  );
}

export default Leagues;
