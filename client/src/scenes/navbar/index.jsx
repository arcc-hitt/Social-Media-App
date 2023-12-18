import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Home,
  Logout,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserImage from "components/UserImage";

const Navbar = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const nuetralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const menuItemStyles = {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    padding: "0.5rem",
    margin: "0rem",
    cursor: "pointer",
    width: "100%",
    borderRadius: "5px",
    '&:hover': {
      bgcolor: alt,
    },
  };

  const menuItemMobileStyles = {
    ...menuItemStyles,
    borderRadius: "0px",
    justifyContent: "center",
  };

  const menuItems = isNonMobileScreens
    ? [
        { icon: <Home sx={{ fontSize: "25px" }} />, text: "Home", onClick: () => navigate("/home") },
        { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search" },
        {
          icon: theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: nuetralDark, fontSize: "25px" }} />
          ),
          text: "Theme",
          onClick: () => dispatch(setMode()),
        },
        { icon: <Message sx={{ fontSize: "25px" }} />, text: "Messages" },
        { icon: <Notifications sx={{ fontSize: "25px" }} />, text: "Notifications" },
        {
          icon: <UserImage image={picturePath} size="25px" />,
          text: "My Profile",
          onClick: () => {
            navigate(`/profile/${userId}`);
            navigate(0);
          },
        },
        { icon: <Logout sx={{ fontSize: "25px" }} />, text: "Logout", onClick: () => dispatch(setLogout()) },
      ]
    : [
        { icon: <Home sx={{ fontSize: "25px" }} />, text: "Home", onClick: () => navigate("/home") },
        { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search" },
        {
          icon: theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: nuetralDark, fontSize: "25px" }} />
          ),
          text: "Theme",
          onClick: () => dispatch(setMode()),
        },
        {
          icon: <UserImage image={picturePath} size="25px" />,
          text: "My Profile",
          onClick: () => {
            navigate(`/profile/${userId}`);
            navigate(0);
          },
        },
        { icon: <Logout sx={{ fontSize: "25px" }} />, text: "Logout", onClick: () => dispatch(setLogout()) },
      ];

  return (
    <Box
      backgroundColor={background}
      height={isNonMobileScreens ? "100vh" : "auto"}
      position={isNonMobileScreens ? "fixed" : "static"}
      bottom={isNonMobileScreens ? "0" : "auto"}
      width={isNonMobileScreens ? "15%" : "100%"}
      zIndex="10"
      display={isNonMobileScreens ? "flex" : "block"}
      flexDirection={isNonMobileScreens ? "column" : "row"}
      sx={{
        borderRight: `1px solid ${theme.palette.neutral.medium}`,
      }}
    >
      {isNonMobileScreens ? (
        // Desktop Navbar
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="2rem"
          position="fixed"
          padding="2rem 0rem 2rem 2rem"
          height="100vh"
        >
          <img
            onClick={() => navigate("/home")}
            src="/assets/logo.png"
            alt="PulseWave Logo"
            style={{
              width: "10rem",
              height: "auto",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          />
          {/* Logo...Notifications */}
          <Box display="flex" flexDirection="column" gap="2rem" width="100%">
            {menuItems.slice(0, 5).map((item, index) => (
              <Box key={index} onClick={item.onClick} sx={menuItemStyles}>
                {item.icon}
                <Typography>{item.text}</Typography>
              </Box>
            ))}
          </Box>

          {/* Profile and Logout */}
          <Box display="flex" flexDirection="column" gap="2rem" width="100%" marginTop="auto">
            {menuItems.slice(5).map((item, index) => (
              <Box key={index} onClick={item.onClick} sx={menuItemStyles}>
                {item.icon}
                <Typography>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
          // Mobile Navbar
          <Box
            position="fixed"
            bottom="0"
            width="100%"
            backgroundColor={background}
            borderTop={`1px solid ${theme.palette.neutral.medium}`}
            zIndex="10"
            display="flex"
            justifyContent="space-around"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
            >
              {menuItems.slice(0, 5).map((item, index) => (
                <Box key={index} onClick={item.onClick} sx={menuItemMobileStyles}>
                  {item.icon}
                </Box>
              ))}
            </Box>
          </Box>
      )}
    </Box>
  );
};

export default Navbar;
