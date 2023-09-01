import React from "react";
import { Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import NavBar from "./MScomponents/NavBar";
import RightBar from "./MScomponents/RightBar";
import LeftBar from "./MScomponents/LeftBar";
import Posts from "./MScomponents/Posts";
import Add from "./MScomponents/Add";

function MainSite() {
  return (
    <Box>
      <NavBar />
      <Stack direction={"row"} justifyContent={"space-between"} spang={2}>
        <LeftBar />
        <Routes>
          <Route path="/posts" element={<Posts />} />
        </Routes>
        <RightBar />
      </Stack>
      <Add />
    </Box>
  );
}

export default MainSite;
