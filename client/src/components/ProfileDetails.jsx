import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Alert, Avatar, Box, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./MScomponents/NavBar";
import LeftBar from "./MScomponents/LeftBar";
import "./profileImg.css"

function ProfileDetails() {

  const [fullScreen,setFullScreen]=useState(false);
  const handleClick = (e) =>{
    setFullScreen(true)
    console.log("tutaj")
}
const handleClose = (e) =>{
  setFullScreen(false)

}

  
  return (
    <Box height="100vh">
    <NavBar  />
    <Stack  direction={"row"} justifyContent={"space-between"} spang={2} >
      <LeftBar  />
      <Divider orientation="vertical" flexItem />
      <Box  flex={"8"} padding={2} sx={{ display:"flex", flexDirection:"row", position:"relative", justifyContent:"flex-start", mt:"40px"}}>
        <Avatar
        onClick={handleClick}
        sx={{width:{xs:"150px",sm:"400px"}, height:{xs:"150px",sm:"400px",cursor:"pointer"}}}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"></Avatar>
        <Stack direction="column" gap="10px" sx={{ml:{xs:"40px", sm:"100px"}, mt:{xs:"40px", sm:"100px"}}} >
          <Stack  direction="row">
        <Typography sx={{variant:{xs:"h4", sm:"h3"}}}>First name:</Typography>
        <Typography sx={{variant:{xs:"h4", sm:"h3"}}} ml="6px">Lionel</Typography>
        </Stack>
        <Stack direction="row">
        <Typography sx={{variant:{xs:"h4", sm:"h3"}}}>Last name:</Typography>
        <Typography sx={{variant:{xs:"h4", sm:"h3"}}} ml="6px">Messi</Typography>
        </Stack>
        </Stack>
      </Box>
      <Box onClick={handleClose} bgcolor="rgba(0,0,0,0.7)" height="90.5%"  width="100%"  position="absolute" sx={{display:fullScreen ? "": "none" }}  >
      <Stack 
       sx={{mt:"20px",width:"100%", alignItems:"center"}}>
        <img className="profImg" style={{ display:fullScreen ? "" :"none", position:"fixed"}} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"></img>
        </Stack>
        </Box>
    </Stack>
   
  </Box>
  );
}

export default ProfileDetails;
