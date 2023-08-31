import {  Favorite, FavoriteBorder } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Divider, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';

function MainSite(props){

  const [posts, setPosts] = useState([]);
  const [anchorEl,setAnchorEl] = useState(null);
  const [open,setOpen] = useState(false);
  const handleClose = () =>{
    setAnchorEl(null);
    setOpen(false)
}
const handleClick = (e) =>{
  setAnchorEl(e.currentTarget)
  setOpen(true)
}
 

  useEffect(()=>{
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
    getPosts();
    return;
  },[posts.length]);

  const postsList = posts.map((post) =>{
    return(
      <Card key={post._id} sx={{mt:"40px"}}>
      <CardHeader
        avatar={ 
        <Avatar>
        </Avatar>
        
        }
        action={
           <IconButton onClick={handleClick} aria-label="settings">
           <MoreVertIcon  />
          
           </IconButton>

        }
         title="Charles Watts"
         subheader={post.postDate}
      />
      <Menu
    id="demo-positioned-menu"
    aria-labelledby="demo-positioned-button"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    anchorOrigin={{
        vertical:"bottom",
        horizontal:"right"
    }}
    transformOrigin={{
        vertical:"top",
        horizontal:"right"
    }}
   >
    <MenuItem  onClick={handleClose} ><DeleteIcon  /><Typography ml="4px">Delete Post</Typography></MenuItem> 
   </Menu>
      
<CardMedia
        component="img"
        height="20%"
        image={post.imgURL}
      />
<CardContent
 > 
 <Typography fontSize={"18px"} color="text.secondary">
  {post.post}
 </Typography>

 
</CardContent>

<CardActions disableSpacing>
 <IconButton aria-label="add to favorites">
 <Checkbox
  icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />

 </IconButton>
 <IconButton aria-label="share">
   <ShareIcon />
 </IconButton>
</CardActions>

</Card>

    )
  })

    return(
        <Box  flex={"4"} padding={2} sx={{ display:"flex",alignItems:"center", flexDirection:"column"}}>
          <Paper sx={{display:"flex", justifyContent:"center", padding:"10px", width:"90%"}}><Typography textAlign="center" fontSize="48px" fontWeight="600"color="danger" >Latest posts and news</Typography></Paper>
          <Box>
         {postsList}
    </Box>
        </Box>
    )
}

export default MainSite