import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import axios from 'axios';
import FeaturedCard from 'components/FeaturedCard';
import { setPlaylistId } from "state";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeaturedWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  const handleClick = (playlistId) => {
    dispatch(setPlaylistId(playlistId));
  };

  // useEffect(() => {
  //   const fetchfeatured = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/music/home");
  //       const songsData = response.data.results.music_this_year.list;
  //       setSongs(songsData);
  //       console.log(songsData);
  //     } catch (error) {
  //       console.error("Error fetching music data:", error);
  //     }
  //   };
  //   fetchfeatured();
  // }, []);

  const handleCarouselChange = (index) => {
    setCurrentIndex(index);
  };

  const songs = [
    { title: 'Card 1', img: '/assets/761.jpg' },
    { title: 'Card 2', img: '/assets/761.jpg' },
    { title: 'Card 3', img: '/assets/761.jpg' },
    { title: 'Card 4', img: '/assets/761.jpg' },
    { title: 'Card 5', img: '/assets/761.jpg' },
    { title: 'Card 6', img: '/assets/761.jpg' },
  ]

  return (
    <Carousel
      indicators={true}
      onChange={handleCarouselChange}
      indicatorIconButtonProps={{
        sx: {
          '&:hover': {
            color: 'white'
          }
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: 'white',
        }
      }}
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          bottom: '1rem',
          left: '2rem',
          margin: '0',
          textAlign: 'left',
          zIndex: 1,
        }

      }}
    >
      {songs.map((song, index) => (
        <Box
          key={song.playlistId}
          sx={{
            borderRadius: '0.75rem',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate("/playlistInfo")
            handleClick(song.playlistId)
          }}
        >
          <FeaturedCard
            title={song.title}
            picturePath={song.img}
            // picturePath={song.thumbnail}
            currentIndex={currentIndex}
            index={index}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default FeaturedWidget;
