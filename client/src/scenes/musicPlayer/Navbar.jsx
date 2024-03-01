import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, InputAdornment, useTheme, Button } from "@mui/material";
import { Search as SearchIcon, Home as HomeIcon, LibraryMusic as LibraryIcon, Person as PersonIcon, ArrowCircleLeft as ArrowCircleLeftIcon } from "@mui/icons-material";
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const MenuItem = ({ icon, text, path }) => {
        return (
            <Button color="inherit" sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => navigate(path)}>
                {icon}
                <Typography sx={{ color: theme.palette.neutral.dark, marginLeft: '0.5rem' }}>
                    {text}
                </Typography>
            </Button>
        );
    }
    return (
        <AppBar position="fixed">
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
                            width='200vw'
                            height='auto'
                            onClick={ () => navigate('/musicPlayer')}
                            sx={{
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
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MenuItem icon={<ArrowCircleLeftIcon />} text="Back to PulseWave" path="/home" />
                    <MenuItem icon={<HomeIcon />} text="Home" path="/musicPlayer" />
                    <MenuItem icon={<LibraryIcon />} text="Library" path="/library" />
                    <MenuItem icon={<PersonIcon />} text="Profile" path="/profile" />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
