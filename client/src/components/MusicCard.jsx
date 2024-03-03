import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, useTheme } from '@mui/material';

const MusicCard = ({ title, artist, imagePath }) => {
  const { palette } = useTheme();
  return (
    <Card
      title={title}
      sx={{
        width: '150px',
        height: '100%',
        backgroundColor: palette.background.default,
        backgroundImage: 'none',
        boxShadow: 'none',
        cursor: 'pointer',
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        image={imagePath || "/assets/761.jpg"}
        alt='Album image'
      />
      <CardContent sx={{ pt: '0.5rem', px: 0, pb: 0 }}>
        <Typography
          gutterBottom
          variant='h5'
          sx={{
            color: palette.neutral.dark,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
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
          {artist}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MusicCard;
