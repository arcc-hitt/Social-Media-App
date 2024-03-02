import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Slide } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { useDispatch, useSelector } from "react-redux";
import { setartists } from "state";
import axios from 'axios';
import MusicWidgetTitle from "components/MusicWidgetTitle";
import ArtistImageCard from "components/ArtistImageCard";

const ArtistsWidget = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");
    const containerRef = useRef(null);
    const token = useSelector((state) => state.token);

    // const artists = useSelector((state) => state.artists);

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/music/topArtists");
                // const artistsData = response.data.results.charts.top_artist.list;
                const artistsData = response.data;
                setArtists(artistsData);
            } catch (error) {
                console.error("Error fetching music data:", error);
            }
        };
        fetchMusicData();
    }, []);

    const cardsPerPage = 8;
    const totalPages = Math.ceil(artists.length / cardsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        setSlideDirection("left");
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
        setSlideDirection("right");
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleNextPage,
        onSwipedRight: handlePrevPage,
        preventDefaultTouchmoveEvent: true,
        artistMouse: true,
    });

    return (
        <>
            {/* artists Carousel*/}
            <Box>
                <MusicWidgetTitle
                    title='Top Artists'
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
                <Stack
                    direction="row"
                    width="100%"
                    ref={containerRef}
                >
                    <Slide
                        direction={slideDirection}
                        in={true}
                        container={containerRef.current}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={4}
                        >
                            {artists.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((artist, index) => (
                                <ArtistImageCard
                                    key={index}
                                    title={artist.artist}
                                    // title={artist.title}
                                    // imagePath={artist.thumbnail}
                                />
                            ))}
                        </Stack>
                    </Slide>
                </Stack>
            </Box>
        </>
    );
};

export default ArtistsWidget;
