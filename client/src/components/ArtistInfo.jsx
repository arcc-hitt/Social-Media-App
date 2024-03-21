import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { PauseCircleOutline, PlayCircleOutline } from '@mui/icons-material';
import { setPaused, setSongId, setPlayingIndex } from 'state';
import { useDispatch, useSelector } from 'react-redux';

const ArtistInfo = ({ items }) => {
    const dispatch = useDispatch();
    const currentPlayingIndex = useSelector((state) => state.playingIndex);
    const songId = useSelector((state) => state.songId);
    // const paused = useSelector((state) => state.paused);

    const handlePlayPause = (index, videoId) => {
        const isPlaying = currentPlayingIndex === index && songId === videoId;
        dispatch(setSongId(isPlaying ? null : videoId));
        dispatch(setPlayingIndex(isPlaying ? null : index));
        dispatch(setPaused(isPlaying));
    };
    
    return (
        <List sx={{ width: '100%', bgcolor: 'inherit', marginBottom: '5rem' }}>
            {items.map((item, index) => (
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
                                        {item.author || item.subtitle}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
}

export default ArtistInfo;
