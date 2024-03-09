import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    Slider,
    IconButton,
    Stack,
    useTheme,
} from '@mui/material';
import {
    PauseRounded,
    PlayArrowRounded,
    FastForwardRounded,
    FastRewindRounded,
    VolumeUpRounded,
    VolumeDownRounded,
} from '@mui/icons-material';
import { setPaused, setSongId } from 'state';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Widget = styled('Box')(() => ({
    padding: '0.5rem',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 'auto',
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    zIndex: 1,
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    backdropFilter: `blur( 4px )`,
    '-webkit-backdrop-filter': `blur( 4px )`,
}));

const CoverImage = styled('Box')({
    width: '5vw',
    height: '5vw',
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
        height: '100%',
    },
});

const SongDetailsContainer = styled('Box')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexBasis: '15%',
});

const NavigationContainer = styled('Box')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '10%',
});

const SongProgressContainer = styled('Box')({
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
});

const VolumeContainer = styled('Box')({
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    flexBasis: '10%',
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const MusicPlayer = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [position, setPosition] = useState(0);
    const paused = useSelector((state) => state.paused);
    const mainIconColor = theme.palette.neutral.dark;
    const lightIconColor = theme.palette.neutral.main;

    const songId = useSelector((state) => state.songId);
    console.log(songId);
    const [musicInfo, setMusicInfo] = useState({});

    useEffect(() => {
        const fetchMusicInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/music/getMusicInfo/${songId}`);
                setMusicInfo(response.data);
                console.log(musicInfo);
            } catch (error) {
                console.error("Error fetching artist information:", error);
            }
        };
        if (songId) {
            fetchMusicInfo();
        }
    }, [songId]);

    const duration = musicInfo.basic_info?.duration || 200;
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Widget>
                {/* Song Details */}
                <SongDetailsContainer>
                    <CoverImage>
                        <img
                            alt="Cover Picture"
                            src={musicInfo.basic_info?.thumbnail[1].url || '/assets/761.jpg'}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </CoverImage>
                    <Box ml='0.5rem' >
                        <Typography
                            variant="subtitle"
                            color={theme.palette.neutral.main}
                            fontWeight={500}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {musicInfo.basic_info?.author || 'Artist'}
                        </Typography>
                        <Typography
                            noWrap
                            variant='h5'
                            color={theme.palette.neutral.dark}
                            fontWeight={500}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {musicInfo.basic_info?.title || 'Song'}
                        </Typography>
                        <Typography
                            noWrap
                            variant='h6'
                            color={theme.palette.neutral.dark}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {musicInfo.basic_info?.tags[musicInfo.basic_info.tags.length - 2] || 'Type'}
                        </Typography>
                    </Box>
                </SongDetailsContainer>

                {/* Song navigation buttons */}
                <NavigationContainer>
                    <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={() => 
                            dispatch(setPaused(!paused)
                        )}
                    >
                        {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                            />
                        ) : (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </NavigationContainer>

                {/* Song progress slider */}
                <SongProgressContainer>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        onChange={(_, value) => setPosition(value)}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            height: 4,
                            '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                '&::before': {
                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                        ? 'rgb(255 255 255 / 16%)'
                                        : 'rgb(0 0 0 / 16%)'
                                        }`,
                                },
                                '&.Mui-active': {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.28,
                            },
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TinyText>{formatDuration(position)}</TinyText>
                        <TinyText>-{formatDuration(duration - position)}</TinyText>
                    </Box>
                </SongProgressContainer>

                {/* Volume slider */}
                <VolumeContainer>
                    <VolumeDownRounded htmlColor={lightIconColor} />
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 10,
                                height: 10,
                                backgroundColor: '#fff',
                                '&::before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded htmlColor={lightIconColor} />
                </VolumeContainer>
            </Widget>
        </Box>
    );
}

export default MusicPlayer;
