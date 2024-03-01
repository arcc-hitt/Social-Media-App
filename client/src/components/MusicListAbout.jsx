import * as React from 'react';
import { Card, CardContent, CardMedia, Tooltip, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

const MusicListAbout = ({ title, author, cover, desc, duration, songs, release }) => {
    const { palette } = useTheme();
    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: palette.background.default,
                backgroundImage: 'none',
                boxShadow: 'none',
            }}
        >
            <CardMedia
                sx={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1.5/1',
                }}
                image={cover}
                component="img"
            />
            <CardContent sx={{ pt: '0.5rem', px: 0, pb: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '70%' }}>
                        <Typography
                            gutterBottom
                            variant='h2'
                            sx={{
                                color: palette.neutral.dark,
                                // overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                // whiteSpace: 'nowrap',
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='h4'
                            sx={{
                                color: palette.neutral.mediumMain,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {author}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 'auto' }}>
                        <Typography
                            gutterBottom
                            variant='subtitle'
                            sx={{
                                color: palette.neutral.mediumMain,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Total Duration: {duration}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='subtitle'
                            sx={{
                                color: palette.neutral.mediumMain,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Total Songs: {songs}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='subtitle'
                            sx={{
                                color: palette.neutral.mediumMain,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Album Release: {release}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    gutterBottom
                    variant='body'
                    sx={{
                        color: palette.neutral.mediumMain,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                    }}
                >
                    {desc}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MusicListAbout;
