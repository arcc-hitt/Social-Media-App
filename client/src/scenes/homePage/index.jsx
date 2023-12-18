import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  const [displayedPicturePath, setDisplayedPicturePath] = useState(picturePath);

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 2rem 2rem 0rem"
        display={isNonMobileScreens ? "flex" : "block"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "15%" : "100%"}>
          <Navbar userId={_id} picturePath={displayedPicturePath}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "45%" : "100%"}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="20%">
            {/* <AdvertWidget /> */}
            <UserWidget userId={_id} picturePath={displayedPicturePath} setDisplayedPicturePath={setDisplayedPicturePath} />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
