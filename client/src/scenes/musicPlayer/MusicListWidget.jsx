import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import MusicList from "components/MusicList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MusicListAbout from "components/MusicListAbout";

const MusicListWidget = () => {
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [aboutInfo, setAboutInfo] = useState({});
    const playlistId = useSelector((state) => state.playlistId);
    console.log(playlistId);

    useEffect(() => {
        const fetchPlaylistInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/music/${playlistId}`);
                setPlaylistInfo(response.data.results);
                setAboutInfo(response.data);
                // console.log(response.data);
                // console.log(response.data.results);
            } catch (error) {
                console.error("Error fetching playlist information:", error);
            }
        };
        fetchPlaylistInfo();
    }, []);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    padding: '2rem',
                    overflow: 'hidden',
                }}
            >
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                    <Box gridColumn="span 12" marginBottom="2rem">
                        <Navbar />
                    </Box>
                    <Box gridColumn="span 7">
                        {playlistInfo.map((playlist, index) => (
                            <MusicList
                                key={index}
                                title={playlist.title}
                                author={playlist.author}
                                picture={playlist.thumbnail}
                                duration={playlist.duration}
                            />
                        ))}
                    </Box>
                    <Box gridColumn="span 5">
                            <MusicListAbout
                                title={aboutInfo.title}
                                author={aboutInfo.albumAuthor}
                                cover={aboutInfo.albumCover}
                                desc={aboutInfo.albumDescription}
                                duration={aboutInfo.albumTotalDuration}
                                songs={aboutInfo.albumTotalSong}
                                release={aboutInfo.albumRelease}
                            />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default MusicListWidget;