import { Box, useMediaQuery } from "@mui/material";
import SongsWidget from "./SongsWidget";
import FeaturedWidget from "./FeaturedWidget";
import CategoryWidget from "./CategoryWidget";
import ArtistsWidget from "scenes/musicPlayer/ArtistsWidget";
import Navbar from "./Navbar";

const MusicPlayer = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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
                </Box>
            </Box>
        </>
    );
}

export default MusicPlayer;