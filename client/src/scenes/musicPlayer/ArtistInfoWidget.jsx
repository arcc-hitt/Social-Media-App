import { Box, Stack, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ArtistInfo from "components/ArtistInfo";
import ArtistAbout from "components/ArtistAbout";

const ArtistInfoWidget = () => {
    const [artistInfo, setArtistInfo] = useState({});
    const channelId = useSelector((state) => state.channelId);
    console.log(channelId);

    useEffect(() => {
        const fetchArtistInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/music/getArtistInfo/${channelId}`);
                setArtistInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching artist information:", error);
            }
        };
        fetchArtistInfo();
    }, [channelId]);
    console.log(artistInfo);

    return (
        <Box sx={{ width: '100%', padding: '2rem', overflow: 'hidden' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                <Box gridColumn="span 12" marginBottom="2rem">
                    <Navbar />
                </Box>
                <Box gridColumn="span 7">
                    {['songs', 'albums', 'singles', 'videos', 'featured_on'].map((category, index) => (
                        <Stack key={index} direction="column" spacing={1}>
                            <Typography variant="h3">
                                {artistInfo[category].titleHeader}
                            </Typography>
                            <ArtistInfo items={artistInfo[category].contents} />
                        </Stack>
                    ))}
                </Box>

                <Box gridColumn='span 5'>
                    <ArtistAbout
                        title={artistInfo.title}
                        cover={artistInfo.thumbnail}
                        desc={artistInfo.description}
                        views={artistInfo.about.titleSubheader}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ArtistInfoWidget;
