import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    Typography,
    Slider,
    IconButton,
    useTheme,
    ListItemText,
    ListItemAvatar,
    ListItem,
    List,
    Avatar,
    Divider,
} from '@mui/material';
import {
    PauseRounded,
    PlayArrowRounded,
    FastForwardRounded,
    FastRewindRounded,
    VolumeUpRounded,
    VolumeDownRounded,
    ExpandLessRounded,
    PauseCircleOutline,
    PlayCircleOutline,
} from '@mui/icons-material';
import { setPaused, setSongId, setPlayingIndex } from 'state';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Widget = styled('Box')({
    padding: '0.5rem',
    width: '100%',
    height: '13%',
    position: 'fixed',
    bottom: 0,
    left: 'auto',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    zIndex: 2,
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    backdropFilter: `blur( 4px )`,
    '-webkit-backdrop-filter': `blur( 4px )`,
});

const ExpandedWidget = styled('Box')({
    padding: '1rem',
    paddingBottom: '11.65%',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    bottom: 0,
    left: 'auto',
    right: 0,
    top: 62,
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: 'repeat(12, 1fr)',
    gap: 20,
    alignItems: 'start',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    justifyItems: 'start',
    zIndex: 2,
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    backdropFilter: `blur( 4px )`,
    '-webkit-backdrop-filter': `blur( 4px )`,
});

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
    overflow: 'hidden',
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
    const mainIconColor = theme.palette.neutral.dark;
    const lightIconColor = theme.palette.neutral.main;

    const [position, setPosition] = useState(0);
    const paused = useSelector((state) => state.paused);
    const songId = useSelector((state) => state.songId);
    const currentPlayingIndex = useSelector((state) => state.playingIndex);
    console.log(songId);
    const [musicInfo, setMusicInfo] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [nextMusicInfo, setNextMusicInfo] = useState([]);
    const [lyrics, setLyrics] = useState({});

    useEffect(() => {
        const fetchData = async (url, setter) => {
            try {
                const response = await axios.get(url);
                setter(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (songId) {
            fetchData(`http://localhost:3001/music/getMusicInfo/${songId}`, setMusicInfo);
            fetchData(`http://localhost:3001/music/getNextMusicInfo/${songId}`, setNextMusicInfo);
            fetchData(`http://localhost:3001/music/getMusicLyrics/${songId}`, setLyrics);
        }
    }, [songId]);

    const handlePlayPause = (index, videoId) => {
        const isPlaying = currentPlayingIndex === index && songId === videoId;
        dispatch(setSongId(isPlaying ? null : videoId));
        dispatch(setPlayingIndex(isPlaying ? null : index));
        dispatch(setPaused(isPlaying));
    };

    const duration = musicInfo.basic_info?.duration || 200;
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const musicDetails = [
        {
            label: 'Artist',
            value: musicInfo.basic_info?.author || 'Artist',
            variant: 'subtitle',
            fontWeight: 500,
            color: theme.palette.neutral.main,
        },
        {
            label: 'Song',
            value: musicInfo.basic_info?.title || 'Song',
            variant: 'h5',
            fontWeight: 500,
            color: theme.palette.neutral.dark,
        },
    ];

    return (
        <Box sx={{ width: '100%', height: 'auto', overflow: 'hidden', position: 'relative', flex: 1 }}>
            {expanded && (
                <ExpandedWidget expanded={expanded}>
                    {/* About */}
                    <Box
                        gridColumn="span 6"
                        gridRow="span 6"
                        sx={{
                            alignItems: 'flex-start',
                            display: 'flex',
                            width: '100%',
                            flex: 1,
                        }}
                    >
                        <CoverImage
                            sx={{
                                width: '18vw',
                                height: '18vw',
                            }}
                        >
                            <img
                                alt="Cover Picture"
                                src={musicInfo.basic_info?.thumbnail[1].url || '/assets/album_default.png'}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </CoverImage>
                        <Box
                            ml='0.5rem'
                            alignItems='flex-start'
                            overflow='hidden'
                        >
                        {musicDetails.map((detail, index) => (
                            <Typography
                                key={index}
                                gutterBottom
                                noWrap
                                ellipsis
                                overflow='hidden'
                                variant={index === 0 ? 'h4' : 'h2'} // Change variant dynamically
                                color={detail.color}
                                fontWeight={detail.fontWeight || 400}
                            >
                                {detail.value}
                            </Typography>
                        ))}
                        </Box>
                    </Box>


                    {/* Up next */}
                    <Box
                        gridColumn="span 6"
                        gridRow="span 12"
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Typography
                            noWrap
                            ellipsis
                            overflow='hidden'
                            variant='h3'
                            color={theme.palette.neutral.dark}
                            fontWeight={500}
                        >
                            Up next
                        </Typography>
                        <List sx={{ width: '100%', bgcolor: 'inherit', marginBottom: '5rem', }}>
                            {nextMusicInfo.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        alignItems="flex-start"
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="play/pause"
                                                onClick={() => handlePlayPause(index, item.videoId)}
                                            >
                                                {currentPlayingIndex === index && songId === item.videoId ? (
                                                    <PauseCircleOutline />
                                                ) : (
                                                    <PlayCircleOutline />
                                                )}
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={item.title} src={item.thumbnail} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {item.author}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>

                    {/* Lyrics */}
                    <Box
                        gridColumn='span 6'
                        gridRow="span 6"
                        overflow="hidden"
                    >
                        <Typography
                            // noWrap
                            ellipsis
                            overflow='hidden'
                            variant='body'
                            color={theme.palette.neutral.mediumMain}
                        >
                            {lyrics.description?.text || 'Lyrics Not Available'}
                        </Typography>
                    </Box>
                </ExpandedWidget>
            )}

            {/* Shrunken Widget */}
            <Widget>
                {/* Song Details */}
                <SongDetailsContainer>
                    <CoverImage>
                        <img
                            alt="Cover Picture"
                            src={musicInfo.basic_info?.thumbnail[0].url || '/assets/album_default.png'}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </CoverImage>
                    <Box ml='0.5rem' overflow='hidden' >
                        {musicDetails.map((detail, index) => (
                            <Typography
                                key={index}
                                noWrap
                                overflow='hidden'
                                variant={detail.variant}
                                color={detail.color}
                                fontWeight={detail.fontWeight || 400}
                            >
                                {detail.value}
                            </Typography>
                        ))}
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
                <IconButton
                    aria-label="expand-less"
                    onClick={() => setExpanded(!expanded)} // Toggle expanded state
                >
                    <ExpandLessRounded fontSize="large" htmlColor={mainIconColor} />
                </IconButton>
            </Widget>
        </Box>
    );
}

export default MusicPlayer;
