import { Box, useMediaQuery } from "@mui/material";
import SongsWidget from "./SongsWidget";
import FeaturedWidget from "./FeaturedWidget";
import CategoryWidget from "./CategoryWidget";
import ArtistsWidget from "./ArtistsWidget";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";

const MusicPlayerHome = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    padding: '2rem',
                    overflow: 'hidden',
                    pb: '5rem',
                }}
            >
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
                    <Box gridColumn="span 12" marginBottom="2rem">
                        <Navbar />
                    </Box>
                    <Box gridColumn="span 7">
                        <FeaturedWidget />
                    </Box>
                    <Box gridColumn="span 5">
                        <CategoryWidget />
                    </Box>
                    <Box gridColumn="span 12">
                        <SongsWidget />
                    </Box>
                    <Box gridColumn="span 12">
                        <ArtistsWidget />
                    </Box>
                    <Box gridColumn="span 12">
                        <MusicPlayer />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default MusicPlayerHome;