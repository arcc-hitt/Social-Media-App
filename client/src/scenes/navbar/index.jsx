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
  const isNonMobileScreens = useMediaQuery("(min-width: 821px)");

  const theme = useTheme();
  const nuetralDark = theme.palette.neutral.dark;
  const nuetralMain = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (index, onClick) => {
    setSelectedMenuItem(index);
    onClick();
  };

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
    color: nuetralDark,
    '&:hover': {
      bgcolor: alt,
      '& > *': {
        fontWeight: 'bold',
      },
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
        { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search", onClick: () => alert("Will be updated soon...") },
        {
          icon: theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ fontSize: "25px" }} />
          ),
          text: "Theme",
          onClick: () => dispatch(setMode()),
        },
        { icon: <Message sx={{ fontSize: "25px" }} />, text: "Messages", onClick: () => alert("Will be updated soon...") },
        { icon: <Notifications sx={{ fontSize: "25px" }} />, text: "Notifications", onClick: () => alert("Will be updated soon...") },
        {
          icon: <UserImage image={picturePath} size="25px" />,
          text: "My Profile",
          onClick: () => {
            navigate(`/profile/${userId}`);
          },
        },
        { icon: <Logout sx={{ fontSize: "25px" }} />, text: "Logout", onClick: () => dispatch(setLogout()) },
      ]
    : [
        { icon: <Home sx={{ fontSize: "25px" }} />, text: "Home", onClick: () => navigate("/home") },
        { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search", onClick: () => alert("Will be updated soon...") },
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
          },
        },
        { icon: <Logout sx={{ fontSize: "25px" }} />, text: "Logout", onClick: () => dispatch(setLogout()) },
      ];

  return (
    <div>
      {isNonMobileScreens ? (
        // Desktop Navbar
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-around"
          gap="2rem"
          position="fixed"
          padding="2rem 2rem 2rem 2rem"
          height="100vh"
          backgroundColor={background}
          top={0}
          sx={{
            borderRight: `1px solid ${theme.palette.neutral.medium}`,
          }}
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
                <Box
                  key={index}
                  onClick={() => {
                    handleMenuItemClick(index, item.onClick);
                  }}
                  sx={{
                    ...menuItemStyles,
                    bgcolor: selectedMenuItem === index ? alt : "inherit",                    
                    '& > *': {
                      fontWeight: selectedMenuItem === index ? "bold" : "normal",
                    },               
                  }}
                >
                  {item.icon}
                  <Typography fontSize="16px">{item.text}</Typography>
                </Box>
              ))}
          </Box>

          {/* Profile and Logout */}
          <Box display="flex" flexDirection="column" gap="2rem" width="100%" marginTop="auto">
            {menuItems.slice(5).map((item, index) => (
              <Box
                key={index + 5}
                onClick={() => {
                  handleMenuItemClick(index + 5, item.onClick);
                }}
                sx={{
                  ...menuItemStyles,
                  bgcolor: selectedMenuItem === index + 5 ? alt : "inherit",
                  '& > *': {
                    fontWeight: selectedMenuItem === index + 5 ? "bold" : "normal",
                  },
                }}
              >
                {item.icon}
                <Typography fontSize="16px">{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
          // Mobile Navbar
          <Box
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            width="100%"
            backgroundColor={background}
            borderTop={`1px solid ${theme.palette.neutral.medium}`}
            zIndex="10"
            display="flex"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              {menuItems.slice(0, 5).map((item, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    handleMenuItemClick(index, item.onClick);
                  }}
                  sx={{
                    ...menuItemMobileStyles,
                    borderTop: selectedMenuItem === index ? `1px solid ${theme.palette.primary.main}` : "inherit",        
                  }}
                >
                  {item.icon}
                </Box>
              ))}
            </Box>
          </Box>
      )}
    </div>
  );
};

export default Navbar;
