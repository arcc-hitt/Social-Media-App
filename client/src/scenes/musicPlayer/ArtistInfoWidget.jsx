import { Box, Stack, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ArtistInfo from "components/ArtistInfo";
import ArtistAbout from "components/ArtistAbout";
import MusicPlayer from "./MusicPlayer";

const ArtistInfoWidget = () => {
    const [artistInfo, setArtistInfo] = useState({});
    const channelId = useSelector((state) => state.channelId);
    // console.log(channelId);

    useEffect(() => {
        const fetchArtistInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/music/getArtistInfo/${channelId}`);
                setArtistInfo(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching artist information:", error);
            }
        };
        fetchArtistInfo();
    }, []);

    return (
        <Box sx={{ width: '100%', padding: '2rem', overflow: 'hidden' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                <Box gridColumn="span 12" marginBottom="2rem">
                    <Navbar />
                </Box>
                <Box gridColumn="span 7">
                    {['songs', 'albums', 'singles', 'videos', 'featured_on'].map((category, index) => (
                        <Stack key={index} direction="column" spacing={1} mb='1rem'>
                            <Typography variant="h3">
                                {artistInfo[category]?.titleHeader || 'Title Header Not Available'}
                            </Typography>
                            <ArtistInfo items={artistInfo[category]?.contents || []} />
                        </Stack>
                    ))}
                </Box>

                <Box gridColumn='span 5'>
                    <ArtistAbout
                        title={artistInfo.title}
                        titleHeader={artistInfo.about?.titleHeader || 'Title Header Not Available'}
                        cover={artistInfo?.thumbnail || '/assets/artist_default.png'}
                        desc={artistInfo.description}
                        subscribers={artistInfo.subscriberCount}
                        views={artistInfo.about?.titleSubheader || 'Views Not Available'}
                    />
                </Box>

                <Box gridColumn='span 12'>
                    <MusicPlayer />
                </Box>
            </Box>
        </Box>
    );
}

export default ArtistInfoWidget;
