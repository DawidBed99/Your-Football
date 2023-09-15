import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {

  Avatar,
  Box,
  Divider,
  Icon,
  Modal,

  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import NavBar from "./MScomponents/NavBar";
import LeftBar from "./MScomponents/LeftBar";
import "./profileImg.css";
import BadgeIcon from "@mui/icons-material/Badge";
import { BrowserView, MobileView } from "react-device-detect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(0,0,0,0.7)",
};



function ProfileDetails(props) {
  const setMode=props.setMode
  const mode=props.mode
  const [open, setOpen] = useState(false);

  const login = localStorage.getItem("login");
  const [disp, setDisp] = useState("none");
  const [disp2, setDisp2] = useState("none");

  const [fullScreen, setFullScreen] = useState(false);
  const handleClick = (e) => {
    setFullScreen(true);
  };
  const handleClose = (e) => {
    setFullScreen(false);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
      
      if(user.profilePicture==="null"){
        setDisp2("none")
      }
      else{
        setDisp2("block")
      }
      setProfileDetails(user);
    }
    
    getUser();
  }, []);
 
  const [form, setForm] = useState({
    profilePicture: "",
  });

  
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function uploadProfilePicture(e) {
    console.log("here!");
    e.preventDefault();
    const profilePictureURL = {
      profilePicture:form.profilePicture,
     
    };
    await fetch(`http://localhost:5000/addProfilePicture/${login}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profilePictureURL),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    console.log("Profile picture added!");
    setOpen(false)
  }
 
  return (
    <Box height="100vh" bgcolor="background.default" color="text.primary">
      <NavBar />
      <Stack direction={"row"} justifyContent={"space-between"} span={2}>
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
          flex={"8"}
          padding={2}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: { xs: "center", md: "start" },
            mt: "40px",
            ml: { xs: "0", md: "80px" },
            alignItems: "center",
          }}
        >
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              sx={{
                
                width: { xs: "150px", sm: "400px" },
                height: { xs: "150px", sm: "400px" },
               
              }}
            />
          ) : (
            <Box>
              {/* <BrowserView> */}
              <Box display={disp2}>
              <Box>
                
                      <Box
                onClick={handleClick}
                onMouseOut={() => setDisp("none")}
                color="white"
                display={disp}
                sx={{
                  zIndex: "999",
                  position: "absolute",
                  width: { xs: "150px", sm: "400px" },
                  height: { xs: "150px", sm: "400px" },
                  borderRadius: "50%",
                  cursor: "pointer",
                  backgroundColor: "rgba(0,0,0,0.6)",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    width: { xs: "150px", sm: "400px" },
                    height: { xs: "150px", sm: "400px" },
                    borderRadius: "50%",
                    fontSize: { xs: "12px", sm: "24px" },
                  }}
                >
                  Click to show in Fullscreen
                </Box>
              </Box>
                
              
              </Box>
              </Box>
              {/* </BrowserView> */}
              <Avatar
                onMouseOver={() => setDisp("block")}
                className="avatar"
                sx={{
                  width: { xs: "150px", sm: "400px" },
                  height: { xs: "150px", sm: "400px"},
                  
                }}
                src={profileDetails.profilePicture}
              ></Avatar>
              <Modal
            disableAutoFocus={true}
            open={fullScreen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img src={profileDetails.profilePicture} />
            </Box>
          </Modal>
            </Box>
            // </Tooltip>
          )}
          <Stack
            sx={{
              ml: { xs: "0", lg: "100px" },
              mt: { xs: "40px", sm: "0px" },
            }}
          >
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                    width: { xs: "300px", sm: "350px" },
                    height: { xs: "250px", sm: "350px" },
                  }}
              />
            ) : (
              <Stack
                direction="column"
                gap="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Icon
                  sx={{
                    width: { xs: "80px", sm: "120px" },
                    height: { xs: "80px", sm: "120px" },
                  }}
                >
                  <BadgeIcon
                    sx={{
                      width: { xs: "80px", sm: "120px" },
                      height: { xs: "80px", sm: "120px" },
                    }}
                  />
                </Icon>

                <Stack direction="row">
                  <Typography sx={{ fontSize: { xs: "16px", sm: "28px" } }}>
                    Nickname:
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "16px", sm: "28px" } }}
                    ml="6px"
                  >
                    {/* {login} */}
                    {profileDetails.login}
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Typography sx={{ fontSize: { xs: "16px", sm: "28px" } }}>
                    E-mail:
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "16px", sm: "28px" } }}
                    ml="6px"
                  >
                    {profileDetails.email}
                  </Typography>
                  
                </Stack>
                <Button
                onClick={(e) => setOpen(true)}
                variant="contained" sx={{fontSize:"16px"}}>Add profile picture</Button>
                <Modal
                open={open}
                onClose={(e) => setOpen(false)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box mt="40px" bgcolor="white"  borderRadius="24px"
                sx={{
                  width: { xs: "350px", md: "400px", sm:"600px" },
                  height: { xs: "500px", sm: "200px" },
                  padding: "12px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-evenly",
                  flexDirection:"column"
                }}>
                  <Typography variant="h5">Profile picture URL</Typography>
                  <form 
                  onSubmit={uploadProfilePicture}
                  >
                    <Stack
                      direction="column"
                      gap="10px"
                      display="flex"
                      alignItems="center"
                    >
                      <TextField
                        style={{ width: "300px" }}
                        id="profilePicture"
                        label="Add profile picture URL"
                        variant="outlined"
                        onChange={(e) =>
                          updateForm({ profilePicture: e.target.value })
                        }
                      />

                      <Button
                        sx={{ width: "100px" }}
                        mt="10px"
                        type="submit"
                        variant="contained"
                        
                      >
                        Add
                      </Button>
                    </Stack>
                  </form>
                </Box>
                </Modal>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProfileDetails;
