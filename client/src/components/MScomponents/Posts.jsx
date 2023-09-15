import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";

function MainSite() {
  const login = localStorage.getItem("login");

  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:5000/posts");

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const posts = await response.json();
      setPosts(posts);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getPosts();

    // return;
  }, [posts.length]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  async function deletePost(id) {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }
    const newPosts = posts.filter((el) => el._id !== id);
    setPosts(newPosts);
    console.log("post deleted");
  }

  const postsList = posts.map((post) => {
    return (
      <Card key={post._id} sx={{ mt: "40px" }}>
        <CardHeader
          avatar={<Avatar src={post.profilePictureURL}></Avatar>}
          action={
            post.userName === login ? (
              <IconButton>
                <Box
                  sx={{
                    borderRadius: "6px",
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deletePost(post._id);
                    }}
                  >
                    <DeleteIcon /> Delete
                  </Button>
                </Box>
                {/* </Popper> */}
              </IconButton>
            ) : (
              <Box></Box>
            )
          }
          title={post.userName}
          subheader={post.postDate}
        />
        <CardMedia component="img" height="20%" image={post.imgURL} />
        <CardContent>
          <Typography fontSize={"18px"} color="text.secondary">
            {post.post}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  });

  return (
    <Box
      flex={"4"}
      padding={2}
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          width: "90%",
        }}
      >
        <Typography
          textAlign="center"
          fontSize="48px"
          fontWeight="600"
          color="danger"
        >
          Latest posts and news
        </Typography>
      </Paper>
      <Box sx={{ width: { xs: "80%", md: "100%" }, height: "100%" }}>
        {loading ? (
          <Box>
            <Card sx={{ mt: "40px", padding: "12px" }}>
              <Stack direction="row" gap="10px" alignItems="center">
                <Skeleton variant="circular" height="40px" width="40px" />
                <Stack>
                  <Skeleton width="80px" height="30px" />
                  <Skeleton width="100px" height="24px" />
                </Stack>
              </Stack>

              <Skeleton
                sx={{ mt: "12px" }}
                variant="rectangular"
                height="250px"
                width="100%"
              />
              <Skeleton variant="text" height="180px" width="100%" />
            </Card>
            <Card sx={{ mt: "40px", padding: "12px" }}>
              <Stack direction="row" gap="10px" alignItems="center">
                <Skeleton variant="circular" height="40px" width="40px" />
                <Stack>
                  <Skeleton width="80px" height="30px" />
                  <Skeleton width="100px" height="24px" />
                </Stack>
              </Stack>

              <Skeleton
                sx={{ mt: "12px" }}
                variant="rectangular"
                height="250px"
                width="100%"
              />
              <Skeleton variant="text" height="180px" width="100%" />
            </Card>
          </Box>
        ) : (
          <Box>{postsList}</Box>
        )}
      </Box>
    </Box>
  );
}

export default MainSite;
