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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgba(0,0,0,0.7)",
};

function ProfileDetails() {
  const [disp, setDisp] = useState("none");

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

  return (
    <Box>
      <NavBar />
      <Stack direction={"row"} justifyContent={"space-between"} span={2}>
        <LeftBar />
        <Divider orientation="vertical" flexItem />
        <Box
          flex={"8"}
          padding={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            mt: "40px",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width="400px"
              height="400px"
            />
          ) : (
            // <Tooltip title="Click to show in fullscreen">
            <Box>
              <Box
                onClick={handleClick}
                onMouseOut={() => setDisp("none")}
                color="white"
                display={disp}
                sx={{
                  zIndex: "999",
                  position: "absolute",
                  width: "400px",
                  height: "400px",
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
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    fontSize: "24px",
                  }}
                >
                  Click to show in Fullscreen
                </Box>
              </Box>
              <Avatar
                onMouseOver={() => setDisp("block")}
                className="avatar"
                sx={{
                  width: { xs: "150px", sm: "400px" },
                  height: { xs: "150px", sm: "400px", cursor: "pointer" },
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"
              ></Avatar>
            </Box>
            // </Tooltip>
          )}
          <Stack
            sx={{
              ml: { xs: "40px", sm: "100px" },
              mt: { xs: "40px", sm: "100px" },
            }}
          >
            {loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                width="400px"
                height="250px"
              />
            ) : (
              <Stack direction="column" gap="10px">
                <Stack direction="row">
                  <Typography sx={{ fontSize: { xs: "16px", sm: "28px" } }}>
                    First name:
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "16px", sm: "28px" } }}
                    ml="6px"
                  >
                    Lionel
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row">
                  <Typography sx={{ fontSize: { xs: "16px", sm: "28px" } }}>
                    Last name:
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "16px", sm: "28px" } }}
                    ml="6px"
                  >
                    Messi
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row">
                  <Typography sx={{ fontSize: { xs: "16px", sm: "28px" } }}>
                    E-mail:
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: "16px", sm: "28px" } }}
                    ml="6px"
                  >
                    Messi@gmail.com
                  </Typography>
                </Stack>
                <Divider />
              </Stack>
            )}
          </Stack>
          <Modal
            disableAutoFocus={true}
            open={fullScreen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <img
                className="profImg"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"
              />
            </Box>
          </Modal>
        </Box>
        {/* <Box onClick={handleClose} bgcolor="rgba(0,0,0,0.7)" height="90.5%"  width="100%"  position="absolute" sx={{display:fullScreen ? "": "none" }}  >
      <Stack 
       sx={{mt:"20px",width:"100%", alignItems:"center"}}>
        <img className="profImg" style={{ display:fullScreen ? "" :"none", position:"fixed"}} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg"></img>
        </Stack>
        </Box> */}
      </Stack>
    </Box>
  );
}

export default ProfileDetails;
