import React, { useState, useRef, useEffect } from "react";
import { Box, Stack, Slide } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import MusicCard from 'components/MusicCard';
import { useDispatch, useSelector } from "react-redux";
import { setTracks } from "state";
import axios from 'axios';
import MusicWidgetTitle from "components/MusicWidgetTitle";
import { setPlaylistId } from "state";
import { useNavigate } from "react-router-dom";

const SongsWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");
    const containerRef = useRef(null);
    const token = useSelector((state) => state.token);

    const tracks = useSelector((state) => state.tracks);

    const [songs, setSongs] = useState([]);

    const handleClick = (playlistId) => {
        dispatch(setPlaylistId(playlistId));
    };

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/music/home");
                const songsData = response.data.results.new_release_albums;
                setSongs(songsData);
                // console.log(songsData)
            } catch (error) {
                console.error("Error fetching music data:", error);
            }
        };
        fetchMusicData();
    }, []);

    const cardsPerPage = 8;
    const totalPages = Math.ceil(songs.length / cardsPerPage);

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
        trackMouse: true,
    });

    return (
        <>
            {/* Songs Carousel*/}
            <Box>
                <MusicWidgetTitle
                    title='Just Released'
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "row",
                        width: "100%",
                    }}
                    ref={containerRef}
                >
                    {songs.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((song, index) => (
                        <Slide
                            key={index}
                            direction={slideDirection}
                            in={true}
                            container={containerRef.current}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={4}
                                style={{ width: `${100 / cardsPerPage}%` }}
                                onClick={() => {
                                    navigate("/playlistInfo")
                                    handleClick(song.browseId)
                                }}
                            >
                                <MusicCard
                                    key={index}
                                    title={song.title}
                                    artist={song.subtitle}
                                    imagePath={song.thumbnail}
                                />
                            </Stack>
                        </Slide>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default SongsWidget;
