import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import StoriesWidget from "scenes/widgets/StoriesWidget";
import MyStoryWidget from "scenes/widgets/MyStoryWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Box
        width="100%"
        padding={isNonMobileScreens ? "2rem 2rem 2rem 0rem" : "1rem"}
        display={isNonMobileScreens ? "flex" : "block"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "15%" : "100%"} mb="3rem">
          <Navbar userId={_id} picturePath={picturePath}/>
        </Box>        

        <Box flexBasis={isNonMobileScreens ? "45%" : "100%"}>
          <Box>
            <StoriesWidget userId={_id} userPicturePath={picturePath} />
          </Box>
          <Box>
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="20%">
            {/* <AdvertWidget /> */}
            <UserWidget userId={_id} picturePath={picturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
