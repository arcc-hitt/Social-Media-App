import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import axios from 'axios';
import FeaturedCard from 'components/FeaturedCard';

const FeaturedWidget = () => {
  // const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

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
      indicators={false}
      onChange={handleCarouselChange}
    >
      {songs.map((song, index) => (
        <Paper
          key={song.playlistId}
          sx={{
            borderRadius: '0.75rem',
            alignItems: 'center',
          }}
        >
          <FeaturedCard
            title={song.title}
            picturePath={song.img}
            // picturePath={song.thumbnail}
            currentIndex={currentIndex}
            index={index}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default FeaturedWidget;
