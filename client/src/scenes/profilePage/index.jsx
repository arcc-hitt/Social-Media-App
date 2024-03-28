import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { _id, picturePath } = useSelector((state) => state.user);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  console.log(userId);

  return (
    <Box>
      <Box
        width="100%"
        padding={isNonMobileScreens ? "2rem 2rem 2rem 0rem" : "2rem"}
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-around"
      >
        <Box flexBasis={isNonMobileScreens ? "15%" : undefined} mb="2rem">
          <Navbar userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "43%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
