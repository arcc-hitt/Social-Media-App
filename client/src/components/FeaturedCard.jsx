import { Box, Typography} from "@mui/material";

const FeaturedCard = ({ title, picturePath, currentIndex, index }) => {
    const indexDiff = currentIndex - index;
    const isCurrent = indexDiff === 0;
    return (
        <Box sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${picturePath})`,
                    backgroundSize: 'contain',
                    transition: 'transform 0.5s ease-in-out',
                    transform: isCurrent ? 'translateX(0)' : 'translateX(100%)',
                }}
            >
                {/* Song Image */}
                <img
                    style={{
                        width: 'auto',
                        height: '100%',
                        objectFit: 'contain',
                        marginLeft: 'auto',
                        transition: 'transform 0.5s ease-in-out',
                        transform: isCurrent ? 'translateX(0)' : 'translateX(100%)',
                    }}
                    alt="songImg"
                    src={picturePath}
                />
                {/* Subtitle "Featured" */}
                <Typography
                    variant="h5"
                    component="Box"
                    sx={{
                        position: 'absolute',
                        bottom: '6rem',
                        left: '2rem',
                        color: 'silver',
                        zIndex: 1,
                        letterSpacing: 2,
                    }}
                >
                    FEATURED
                </Typography>
                {/* Main Title */}
                <Typography
                    variant="h1"
                    component="Box"
                    sx={{
                        position: 'absolute',
                        bottom: '3rem',
                        left: '2rem',
                        right: '2rem',
                        color: 'white',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        textOverflow: 'ellipsis',
                        textAlign: 'left',
                        overflow: 'hidden',
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default FeaturedCard;



// [
//     {
//         "playlistId": "VLRDCLAK5uy_nHSqCJjDrW9HBhCNdF6tWPdnOMngOv0wA",
//         "title": "Pop Gold",
//         "thumbnail": "https://lh3.googleusercontent.com/rAUuEbLF7CYEYBXU3yAY4npMCzTgPxMhlD-ygH9iv_SuDXGDuDvO0Z4MTh33xAI6o3UnpWFe26MS_hBZ=w544-h544-l90-rj",
//         "subtitle": "Ed Sheeran, Alicia Keys, Simply Red, Cyndi Lauper"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_nyKVppE-RpLkeCcwLct4rvN9e8AAsS_qw",
//         "title": "Soft Rock Ballads",
//         "thumbnail": "https://lh3.googleusercontent.com/kIOCCx-ipN4FIOR4DXED5Ag-i0Y_EHMRdHki5M_wvENLMuoD7lDN1eAo4Fd400NY5b4GtamjIsti9Q=w544-h544-l90-rj",
//         "subtitle": "Fleetwood Mac, The Eagles, Phil Collins, Chicago"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_nNGk2yOsNF2AWjk3FbtO8FjvQhT1FUi_c",
//         "title": "Classic Easy Rock",
//         "thumbnail": "https://lh3.googleusercontent.com/FmEI7Y44J_hp2ecFJgoestuzzbTknk1tMMT8MAx1zKYOUN97i5zxlcstXhVzJXulPBKzcpFrAOdARG4=w544-h544-l90-rj",
//         "subtitle": "Fleetwood Mac, Crosby, Stills & Nash, The Eagles, Bob Dylan"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_kluqSMlnog1GDp3fK-kzf787f9DMW8LB0",
//         "title": "All-Time Easy Acoustics",
//         "thumbnail": "https://lh3.googleusercontent.com/t9xcLjNlSeEJMQKHLC4r8ToQACpGuX2Rocmd-V4bLefZ9ltYzzgNtOrYjigjprXGZwDqTz17k5V4zl4=w544-h544-l90-rj",
//         "subtitle": "The Beatles, The Rolling Stones, Ed Sheeran, Bob Dylan"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_km8j1Msn0n8FTLRIw0krI9k2sf-t1Z4hg",
//         "title": "Acoustic Covers of Love Songs",
//         "thumbnail": "https://lh3.googleusercontent.com/Gzvo5VvqNiV-Xr-rGmYrSEPL5L3yAMtp0PVaGG9ekpqiOin6kcGIiV-a-3Vl_r7GgB5TaPJk7AqzNmw=w544-h544-l90-rj",
//         "subtitle": "Adele, Sleeping At Last, James Vincent McMorrow, Boyce Avenue"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_mnx8YfEAZArSNzVKDpNcTBbUDPUxWRrhI",
//         "title": "Warm-hearted Mandopop Ballad",
//         "thumbnail": "https://lh3.googleusercontent.com/8B_SFy-QvQIWH5ClX-RTK2oT1blBTDm5B7AeloFiQkJwsGZHmiXYd-oJZ4bviMamEh-Lu8GwGFq4zyM=w544-h544-l90-rj",
//         "subtitle": "Jay Chou, Eric Chou, Hebe Tien, G.E.M."
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_ldooV6iHaoPy6VKyVuHDq0DT4lh-3tRqQ",
//         "title": "Gentle Piano",
//         "thumbnail": "https://lh3.googleusercontent.com/w_IkywS60PT1JsZafZXkcUtpFR83tsa1vlziPdAP8syGHsMVLOH4QwQKZk8yRi0Lv_eWju4bNQVpz6yj=w544-h544-l90-rj",
//         "subtitle": "The Chillest, Elliott Jack Sansom, Chad Lawson, Ilen"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_kvzSF-chVVpH1r55Frc3fuHXCyRc01sYg",
//         "title": "Relaxing 80s Rock",
//         "thumbnail": "https://lh3.googleusercontent.com/DVF-V7f_M8-7ZFRbX8QaIKiN1EgexcyAMraQ2ZjNn4fhnGGikQ22MZhYCMkoua84MFtfQksUisZr4KYe=w544-h544-l90-rj",
//         "subtitle": "TOTO, UB40, Huey Lewis, Fleetwood Mac"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_njvsGKIUycy_a4h7zTS8upbKhHcMVzHFM",
//         "title": "Easy-Going Pop & Rock",
//         "thumbnail": "https://lh3.googleusercontent.com/M71FPrMhXzJY6ii8g63csVY6kEgTfnUIsIpOdue-5dEE8dgi3deMfoWG9pdPL0vCTZHU4gTVZiT0fXIc=w544-h544-l90-rj",
//         "subtitle": "Coldplay, Bruno Mars, James Morrison, The Script"
//     },
//     {
//         "playlistId": "VLRDCLAK5uy_k2f_-SF4oCrVKPcgHNVifHzjEHkNbvszU",
//         "title": "OPM Unwind",
//         "thumbnail": "https://lh3.googleusercontent.com/L5V2fnbBmVSxCqSN5xpksT6u2QNDGOYOQ07S10nmYLadOaYPtE9V7PgczUEqcxVbKPUk_OQ6cvVdNKAr=w544-h544-l90-rj",
//         "subtitle": "Ben&Ben, Moira Dela Torre, Sarah Geronimo, Side A"
//     }
// ]
