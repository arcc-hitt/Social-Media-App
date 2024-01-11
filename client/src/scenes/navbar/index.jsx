import {
  Box,
  useTheme,
  useMediaQuery,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  Tooltip,
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
import SearchDrawer from "components/SearchDrawer";

const Navbar = ({ userId, picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const nuetralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearchOpen = () => {
    setOpen(!open);
  };

  const handleSearchClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (index, onClick) => {
    setSelectedMenuItem(index);
    onClick();
  };

  const menuItemStyles = {
    borderRadius: "5px",
    color: nuetralDark,
    '&:hover': {
      bgcolor: alt,
      '& > *': {
        fontWeight: 'bold',
      },
    },
  };

  const menuItems = isNonMobileScreens
    ? [
      { icon: <Home sx={{ fontSize: "25px" }} />, text: "Home", onClick: () => { navigate("/home"); setOpen(false); } },
      { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search", onClick: handleSearchOpen },
      {
        icon: theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ fontSize: "25px" }} />
        ),
        text: "Theme",
        onClick: () => dispatch(setMode()),
      },
      { icon: <Message sx={{ fontSize: "25px" }} />, text: "Messages", onClick: () => { } },
      { icon: <Notifications sx={{ fontSize: "25px" }} />, text: "Notifications", onClick: () => { } },
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
      { icon: <Home sx={{ fontSize: "25px" }} />, text: "Home", onClick: () => { navigate("/home"); setOpen(!open); } },
      { icon: <Search sx={{ fontSize: "25px" }} />, text: "Search", onClick: handleSearchOpen },
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
          navigate(`/profile/${userId}`)
          navigate(0);
        },
      },
      { icon: <Logout sx={{ fontSize: "25px" }} />, text: "Logout", onClick: () => dispatch(setLogout()) },
      { icon: <Notifications sx={{ fontSize: "23px" }} />, text: "Notifications", onClick: () => { } },
      { icon: <Message sx={{ fontSize: "23px" }} />, text: "Messages", onClick: () => { } },
    ];

  return (
    <div>
      {isNonMobileScreens ? (
        // Desktop Navbar
        <Box sx={{ display: 'flex' }}>
          <Drawer
            sx={{
              width: open ? '6%' : '15%',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: open ? '6%' : '15%',
                boxSizing: 'border-box',
                backgroundColor: background,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            {/* Logo */}
            <Toolbar
              sx={{
                height: "auto",
                cursor: "pointer",
                justifyContent: "center",
              }}
            >
              <img
                onClick={() => navigate("/home")}
                src={open ? "/assets/logo-icon-white.png" : "/assets/logo.png"}
                alt="PulseWave Logo"
                width='100%'
              />
            </Toolbar>

            {/* Home ... Notifications */}
            <List>
              {menuItems.slice(0, 5).map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => {
                    handleMenuItemClick(index, item.onClick);
                  }}
                >
                  {item.text === "Messages" || item.text === "Notifications" ? (
                    <Tooltip title='Will update soon...' placement="bottom">
                      <ListItemButton sx={{...menuItemStyles,}}>
                        <ListItemIcon
                          sx={{
                            '&.MuiListItemIcon-root': {
                              m: 0,
                              p: 0,
                            }
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={open ? null : item.text}
                          primaryTypographyProps={{
                            color: nuetralDark,
                            fontSize: 16,
                          }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  ) : (
                    <ListItemButton sx={{...menuItemStyles,}}>
                      <ListItemIcon
                        sx={{
                          '&.MuiListItemIcon-root': {
                            m: 0,
                            p: 0,
                          }
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={open ? null : item.text}
                        primaryTypographyProps={{
                          color: nuetralDark,
                          fontSize: 16,
                        }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>

            {/* Profile and Logout */}
            <List sx={{ marginTop: 'auto' }}>
              {menuItems.slice(5).map((item, index) => (
                <ListItem
                  key={index + 5}
                  onClick={() => {
                    handleMenuItemClick(index + 5, item.onClick);
                  }}
                >
                  <ListItemButton sx={{...menuItemStyles,}}>
                    <ListItemIcon
                      sx={{
                        '&.MuiListItemIcon-root': {
                          m: 0,
                          p: 0,
                        }
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={open ? null : item.text}
                      primaryTypographyProps={{
                        color: nuetralDark,
                        fontSize: 16,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Search Drawer */}
          {open && (
            <SearchDrawer open />
          )}
        </Box>

      ) : (
        // Mobile Navbar
        <Box>
          {/* Top NavBar */}
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            width="100%"
            backgroundColor={background}
            borderBottom={`1px solid ${theme.palette.neutral.medium}`}
            zIndex="1000"
            display="flex"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
              p="0.3rem"
            >
              <img
                onClick={() => navigate("/home")}
                src={"/assets/logo.png"}
                alt="PulseWave Logo"
                width='40%'
              />
              <Box sx={{ flexGrow: 1 }} />
              {menuItems.slice(5).map((item, index) => (
                <Tooltip title='Will update soon...' placement="bottom">
                  <Box
                    key={index}
                    onClick={() => {
                      handleMenuItemClick(index, item.onClick);
                    }}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      ml: "0.8rem",
                      p: "0.1rem",
                      '&:hover': {
                        bgcolor: alt,
                      },
                      borderRadius: "100%",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* Bottom NavBar */}
          <Box
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            width="100%"
            backgroundColor={background}
            borderTop={`1px solid ${theme.palette.neutral.medium}`}
            zIndex="1000"
            display="flex"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
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
                    justifyContent: "center",
                    alignItems: "center",
                    px: "1.5rem",
                    py: "0.25rem",
                    '&:hover': {
                      bgcolor: alt,
                    },
                    borderTop: selectedMenuItem === index ? `1px solid ${theme.palette.primary.main}` : "inherit",
                  }}
                >
                  {item.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Search Modal */}
          {open && (
            <SearchDrawer open onClose={handleSearchClose} />
          )}
        </Box>
      )}
    </div>
  );
};

export default Navbar;
