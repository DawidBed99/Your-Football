import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add as AddIcon, PhotoCamera } from "@mui/icons-material";
import styled from "@emotion/styled";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ShareIcon from "@mui/icons-material/Share";
import Emote from "@mui/icons-material/AddReactionTwoTone";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",

}));

const Add = () => {
  const login = localStorage.getItem("login");
  const [logState, setLogState] = useState("none");

  const handleLog = () =>{
    if(login.length>0){
      setLogState("");
    }
    else{
      setLogState("none")
    }
  }
  const navigate = useNavigate();
  
  const [open3, setOpen3] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  
  const handleClickEm = (e) => {
    setAnchorEl2(e.currentTarget);
    setOpen3(true);
  };

  const [open2, setOpen2] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen2(false);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen2(true);
  };
  const [open, setOpen] = useState(false);

  const [post, setPost] = useState({
    post: "",
    imgURL: "",
    userName:`${login}`,
    profilePictureURL:"",
  });

  function updatePost(value) {
    return setPost((prev) => {
      return { ...prev, ...value };
    });
  }

  async function uploadPost() {
    await fetch("http://localhost:5000/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log("Post added");
    console.log(post.profilePictureURL)
    setOpen(false);
  }

  useEffect(() => {
    handleLog();

  }, []);

  
  const [profileDetails, setProfileDetails] = useState("");

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `http://localhost:5000/profileDetails/${login}`
      );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setProfileDetails(user);
    }
    if (login.length > 0) {
      getUser();
    }
  }, []);

  return (
    <>
      <Tooltip title="Create post">
        <Fab
          onClick={(e) => {setOpen(true);
            updatePost({profilePictureURL:profileDetails.profilePicture })
           
          }}
                    sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
            display:`${logState}`
          }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          flexDirection={"column"}
          sx={{
            width: { xs: "350px", md: "1200px", sm:"600px" },
            height: { xs: "500px", sm: "600px" },
            padding: "12px",
          }}
          bgcolor="white"
          borderRadius="24px"
        >
          <Typography
          width="100%"
          sx={{textAlign:"center"}}
            mt="20px"
            variant="h3"
            textAlign="center"
            fontWeight="500"
           
          >
            Create post
          </Typography>
          <UserBox
            mt={"40px"}
            sx={{ ml: { xs: "40px", md: "120px",sm:"60px" } }}
            height="80px"
          >
            <Avatar
              sx={{ width: 60, height: 60 }}
              src={profileDetails.profilePicture}
            ></Avatar>
            <Typography variant="span" fontSize="24px">
             {login}
            </Typography>
          </UserBox>
          <Box width={"100%"} display="flex" justifyContent="center" mt="24px">
            <TextField
              id="outlined-basic"
              placeholder="Write something..."
              variant="outlined"
              label="Your post"
              style={{ width: "80%", height: "50%" }}
              multiline
              rows={8}
              inputProps={{ maxLength: 1000 }}
              onChange={(e) => updatePost({ post: e.target.value })}
            />
          </Box>
          <Box sx={{ ml: { xs: "0", md: "108px", sm:"46px" } }} gap="10px">
            {/* <input 
       accept="image/*" 
       id="icon-button-file"
       type="file" 
       style={{ display: 'none' }} />
       <label htmlFor="icon-button-file"> */}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={(e) => setOpen3(true)}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Modal
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={open3}
              onClose={(e) => setOpen3(false)}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                flexDirection="column"
                sx={{
                  width: { xs: "350px", sm: "1000px" },
                  height: { xs: "150px", sm: "150px" },
                  padding: "12px",
                }}
                bgcolor="white"
                borderRadius="24px"
              >
                <Typography variant="h6">Image URL:</Typography>
                <TextField
                  placeholder="Your image URL"
                  onChange={(e) => updatePost({ imgURL: e.target.value })}
                  style={{ width: "95%" }}
                ></TextField>
                <Button onClick={(e) =>setOpen3(false)
               }
                 variant="contained">
                  <Typography>Add</Typography>
                </Button>
              </Box>
            </Modal>
            {/* </label> */}
            <IconButton>
              <ShareIcon
                onClick={handleClick}
                color="primary"
                sx={{ fontSize: 35 }}
              />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open2}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <img
                  width="30px"
                  height="30px"
                  src="https://img.freepik.com/premium-wektory/niebieskie-logo-mediow-spolecznosciowych_197792-1759.jpg"
                ></img>{" "}
                Facebook{" "}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <img
                  width="24px"
                  height="24px"
                  src="https://www.whitemad.pl/wp-content/uploads/2023/07/nowe-logo-twitter.jpeg"
                ></img>
                X(Twitter)
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <img
                  width="24px"
                  height="24px"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Logo_NK.svg/1200px-Logo_NK.svg.png"
                ></img>
                NK
              </MenuItem>
            </Menu>
            <IconButton>
              <Emote
                color="primary"
                onClick={handleClickEm}
                sx={{ fontSize: 35 }}
              />
            </IconButton>
            <Button
              onClick={() => uploadPost()
               }
              sx={{ ml: { lg:"700px",md: "432px", xs: "42px", sm:"224px" } }}
              variant="contained"
            >
              <Typography variant="h7" fontSize="14px" mr="8px">
                Publish
              </Typography>{" "}
              <SendIcon />
            </Button>
        
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Add;
