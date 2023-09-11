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
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Leagues() {
  return (
    <Box overflow="hidden" flex={4}  display="flex" justifyContent="Center" >
      {/* <NavBar /> */}
      <Stack direction={"row"} justifyContent={"space-between"} span={2}>
      {/* <LeftBar /> */}
      {/* <Divider position="fixed" orientation="vertical" flexItem sx={{position:"absolute", left:"300px", height:"85%", display:{xs:"none", lg:"block"} }} /> */}
      <Box   
       sx={{ 
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        mt: "30px",
        alignItems: "center",
      }}>
        <Typography mb="80px" variant="h3" sx={{textDecoration:"underline", textUnderlineOffset:"8px"}}>Football Leagues</Typography>
        <Stack direction="row" display="flex" justifyContent="space-around"  width="100%"  p="30px" >
        <Button variant="contained" color="primary" sx={{borderRadius:"20px", p:"15px",width:{sm:"50px" ,md:"100px",lg:"150px", xl:"200px"}, height:"250px"}}>
          <Stack direction="column" display="flex" alignItems="center">
          <img
          alt="Europe's flag"
          src="https://icon-library.com/images/europe-icon/europe-icon-15.jpg"
          style={{width:"100px", height:"100px"}}/>
        <Typography mt="30px" variant="h5">Top 5 in Europe</Typography>
        </Stack>
        </Button>
        <Button variant="contained" color="success" sx={{borderRadius:"20px", p:"15px",width:{sm:"50px" ,md:"100px",lg:"150px", xl:"200px"}, height:"250px"}}>
          <Stack direction="column" display="flex" alignItems="center">
          <PublicIcon  sx={{width:"100px", height:"100px",mb:"10px" }} color="primary"/>
        <Typography mt="30px" variant="h5">Rest of the world</Typography>
        </Stack>
        </Button>
        <Button variant="contained" color="warning" sx={{borderRadius:"20px", p:"15px",width:{sm:"50px" ,md:"100px",lg:"150px", xl:"200px"}, height:"250px"}}>
          <Stack direction="column" display="flex" alignItems="center">
          <PeopleAltIcon sx={{width:"100px", height:"100px",mb:"10px" }} color="error"/>
        <Typography mt="30px" variant="h5">Custom Leagues</Typography>
        </Stack>
        </Button>
        </Stack>
        </Box>
        </Stack>
    </Box>
  );
}

export default Leagues;
