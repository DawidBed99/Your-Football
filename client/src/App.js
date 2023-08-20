import React from "react";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";
import MainSite from "./components/MainSite";
import Add from "./components/Add";

function App() {
  return (
    <Box>
      <NavBar />
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <LeftBar />
        <MainSite exact path="/" element={<MainSite />} />
        <RightBar />
      </Stack>
      <Add />
    </Box>
  );
}

export default App;
