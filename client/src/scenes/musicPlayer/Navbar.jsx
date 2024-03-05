import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, InputAdornment, useTheme, Button, Box } from "@mui/material";
import { Search, Home, LibraryMusic, Person, ArrowCircleLeft, DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { setMode, setLogout } from "state";
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const MenuItem = ({ icon, text, handleClick }) => {
        return (
            <Button color="inherit" sx={{ '&:hover': { cursor: 'pointer' } }} onClick={handleClick}>
                {icon}
                {text && ( // Conditionally render text and apply margin left
                    <Typography sx={{ color: theme.palette.neutral.dark, marginLeft: '0.5rem' }}>
                        {text}
                    </Typography>
                )}
            </Button>
        );
    }
    return (
        <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.neutral.light}`,
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src='assets/music_logo.png'
                            alt='Music Logo'
                            onClick={ () => navigate('/musicPlayer')}
                            style={{
                                width: '15vw',
                                height: 'auto',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                    <InputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{
                            color: 'inherit',
                            ml: '2rem',
                            border: `1px solid ${theme.palette.neutral.light}`,
                            borderRadius: '50px',
                            py: '0.25rem',
                            px: '1rem',
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton size="small" color="inherit">
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MenuItem icon={<ArrowCircleLeft />} text="Back to PulseWave" handleClick={ () => navigate("/home") } />
                    <MenuItem icon={<Home />} text="Home" handleClick={ () => navigate("/musicPlayer") } />
                    <MenuItem icon={<LibraryMusic />} text="Library" handleClick={ () => navigate("/library") } />
                    <MenuItem icon={<Person />} text="Profile" handleClick={ () => navigate("/profile") } />
                    <MenuItem
                        icon={theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "1.6vw" }} />
                          ) : (
                            <LightMode sx={{ fontSize: "1.6vw" }} />
                          )}
                        handleClick={ () => dispatch(setMode()) }
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
