import React from "react";
import { Box, Grid, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import StoriesWidget from "scenes/widgets/StoriesWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Container maxWidth="xl" disableGutters>
      {/* Box with responsive padding using MUI's sx prop and theme breakpoints */}
      <Box sx={{ px: { xs: 1, sm: 2, md: 3, lg: 5 }, py: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={5}>
          {/* Left Column: Navbar */}
          <Grid item xs={12} sm={2}>
            <Navbar userId={_id} picturePath={picturePath} />
          </Grid>
          {/* Center Column: Main Content */}
          <Grid item xs={12} sm={7}>
            <Box mb={3}>
              <StoriesWidget userId={_id} userPicturePath={picturePath} />
            </Box>
            <Box mb={3}>
              <MyPostWidget picturePath={picturePath} />
            </Box>
            <PostsWidget userId={_id} />
          </Grid>
          {/* Right Column: Additional Widgets */}
          <Grid item xs={12} sm={3}>
            <Box mb={3}>
              <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <FriendListWidget userId={_id} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
