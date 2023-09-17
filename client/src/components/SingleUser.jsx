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
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(0,0,0,0.7)",
};



function SingleUser(props) {
  const setMode=props.setMode
  const mode=props.mode
  
  const [open, setOpen] = useState(false);

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

  const [user, setUser] = useState("");
  const params = useParams();
  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `http://localhost:5000/users/${params.id}`
      );

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      
      setUser(user);
    }
    
    getUser();
  }, []);
 
 
  return (
    <Box bgcolor="background.default" color="text.primary" height="100vh">
      <NavBar />
      <Stack direction={"row"} justifyContent={"space-between"} span={2}>
        <LeftBar  setMode={setMode} mode={mode} />
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
                src={user.profilePicture}
              ></Avatar>
              <Modal
            disableAutoFocus={true}
            open={fullScreen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img src={user.profilePicture} />
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
                    {user.login}
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
                    {user.email}
                  </Typography>
                  
                </Stack>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default SingleUser;
