import React from "react";
import { Box, IconButton, Typography, Button } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const MusicWidgetTitle = ( { title, handlePrevPage, handleNextPage } ) => {

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                }}
            >
                <Box>
                    <Typography
                        variant="h3"
                    >
                        {title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button>See All</Button>
                    <IconButton
                        onClick={handlePrevPage}
                    >
                        <NavigateBefore />
                    </IconButton>

                    <IconButton
                        onClick={handleNextPage}
                    >
                        <NavigateNext />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};

export default MusicWidgetTitle;
