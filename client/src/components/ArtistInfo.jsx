import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ArtistInfo = ({ items }) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'inherit' }}>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
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
