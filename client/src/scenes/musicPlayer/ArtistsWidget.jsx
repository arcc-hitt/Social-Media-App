import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Slide } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { useDispatch, useSelector } from "react-redux";
import { setartists, setChannelId } from "state";
import axios from 'axios';
import MusicWidgetTitle from "components/MusicWidgetTitle";
import ArtistImageCard from "components/ArtistImageCard";
import { useNavigate } from "react-router-dom";

const ArtistsWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");
    const containerRef = useRef(null);
    const token = useSelector((state) => state.token);

    // const artists = useSelector((state) => state.artists);

    const [artists, setArtists] = useState([]);

    const handleClick = (channelId) => {
        dispatch(setChannelId(channelId));
    };

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/music/home");
                const artistsData = response.data.results.charts.top_artist.list;
                // const artistsData = response.data;
                setArtists(artistsData);
                // console.log(artistsData);
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
                    {artists.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((artist, index) => (
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
                                style={{ width: `${100 / cardsPerPage}%` }}
                                onClick={() => {
                                    navigate("/artistInfo")
                                    handleClick(artist.channelId)
                                }}
                            >
                                <ArtistImageCard
                                    key={index}
                                    // title={artist.artist}
                                title={artist.title}
                                imagePath={artist.thumbnail}
                                />
                            </Stack>
                        </Slide>
                    ))}
                </Stack>
            </Box>
        </>
    );
};

export default ArtistsWidget;
