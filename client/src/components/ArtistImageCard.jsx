import React from 'react';
import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({  
  width: '150px',
  height: '150px',
  marginBottom: '1rem',
}));

const ArtistImageCard = ({ title, imagePath }) => {
  const { palette } = useTheme();

  return (
    <Container>
      <AvatarImage
        alt='Artist Image'
        // src='/assets/761.jpg'
        src={imagePath}
      />
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
    </Container>
  );
}

export default ArtistImageCard;
