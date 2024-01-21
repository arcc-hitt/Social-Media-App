import {
  Box,
  Typography,
  useTheme,
  Drawer,
  Autocomplete,
  TextField,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Modal,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { Close } from "@mui/icons-material";

const SearchDrawer = ({ open = false, onClose }) => {
  const { palette } = useTheme();
  const nuetralDark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt;

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUsers = async () => {
    const response = await fetch(`http://localhost:3001/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isNonMobileScreens ? (
        <Drawer
          sx={{
            width: '18%',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '18%',
              boxSizing: 'border-box',
              backgroundColor: background,
              left: open ? "6%" : "0%",
              transition: "left 0.3s ease-in-out",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Box p={2}>
            <Typography
              variant="h3"
              fontWeight="500"
              sx={{ marginBottom: 1 }}
            >
              Search Friends
            </Typography>
            <Autocomplete
              sx={{
                width: '100%',
              }}
              freeSolo
              autoHighlight
              noOptionsText="No User"
              options={users}
              getOptionLabel={(option) => `${option.userName}`}
              filterOptions={(options, { inputValue }) => {
                if (inputValue.trim() === '') {
                  // Return all options when the input is empty
                  return [];
                }

                // Filter options based on the input value
                return options.filter((option) => {
                  const fullName = `${option.firstName} ${option.lastName}`;
                  return (
                    option.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
                    fullName.toLowerCase().includes(inputValue.toLowerCase())
                  );
                });
              }}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  margin="normal"
                  fullWidth={true}
                />
              )}

              ListboxProps={{
                style: {
                  maxHeight: '100%',
                  background: background,
                  borderRadius: 0,
                }
              }}

              renderOption={(props, option) => {
                return (
                  <List {...props}>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/profile/${option._id}`)
                          navigate(0);
                        }}
                        sx={{
                          borderRadius: "5px",
                          color: nuetralDark,
                          '&:hover': {
                            bgcolor: alt,
                          },
                          p: '0.3rem'
                        }}
                      >
                        <ListItemIcon>
                          <UserImage image={option.picturePath} size="35px" />
                        </ListItemIcon>
                        <ListItemText
                          primary={option.userName}
                          secondary={`${option.firstName} ${option.lastName}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                );
              }}
            />
          </Box>
        </Drawer>
      ) : (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="search-modal"
          aria-describedby="search-modal-description"
        >
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              bgcolor: background,
              border: 'none',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box p={2}>
              <Typography
                variant="h3"
                fontWeight="500"
                sx={{ marginBottom: 1 }}
              >
                Search Friends
              </Typography>
              <Autocomplete
                sx={{
                  width: '100%',
                }}
                freeSolo
                autoHighlight
                noOptionsText="No User"
                options={users}
                getOptionLabel={(option) => `${option.userName}`}
                filterOptions={(options, { inputValue }) => {
                  if (inputValue.trim() === '') {
                    // Return no option when the input is empty
                    return [];
                  }

                  // Filter options based on the input value
                  return options.filter((option) => {
                    const fullName = `${option.firstName} ${option.lastName}`;
                    return (
                      option.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
                      fullName.toLowerCase().includes(inputValue.toLowerCase())
                    );
                  });
                }}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    margin="normal"
                    fullWidth={true}
                  />
                )}

                ListboxProps={{
                  style: {
                    maxHeight: '100%',
                    background: background,
                    borderRadius: 0,
                  }
                }}

                renderOption={(props, option) => {
                  return (
                    <List {...props}>
                      <ListItem sx={{ p: 0 }}>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/profile/${option._id}`)
                          }}
                          sx={{
                            borderRadius: "5px",
                            color: nuetralDark,
                            '&:hover': {
                              bgcolor: alt,
                            },
                            p: '0.3rem'
                          }}
                        >
                          <ListItemIcon>
                            <UserImage image={option.picturePath} size="35px" />
                          </ListItemIcon>
                          <ListItemText
                            primary={option.userName}
                            secondary={`${option.firstName} ${option.lastName}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  );
                }}
              />
            </Box>
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{ position: "absolute", top: 0, right: 0, zIndex: 1000 }}
            >
              <Close />
            </IconButton>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default SearchDrawer;

