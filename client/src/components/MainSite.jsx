import React from "react";
import { Route, Routes } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import NavBar from "./MScomponents/NavBar";
import RightBar from "./MScomponents/RightBar";
import LeftBar from "./MScomponents/LeftBar";
import Posts from "./MScomponents/Posts";
import Add from "./MScomponents/Add";
import Leagues from "./Leagues";

function MainSite(props) {
  const setMode = props.setMode;
  const mode = props.mode;
  const login = localStorage.getItem("login");
  return (
    <Box bgcolor="background.default" color="text.primary">
      <NavBar login={login} />
      <Stack direction={"row"} justifyContent={"space-between"} span={2}>
        <LeftBar setMode={setMode} mode={mode} />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          {/* <Route path="/leagues" element={<Leagues />} /> */}
        </Routes>
        <RightBar />
      </Stack>
      <Add />
    </Box>
  );
}

export default MainSite;
