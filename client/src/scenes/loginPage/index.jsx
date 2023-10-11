import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const pageStyles = {
    backgroundImage: `url('/assets/6857762.jpg')`, // Replace with the actual image path
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // Optional: Fixed background
    minHeight: "100vh", // Ensures the background covers the entire viewport height
  };
  
  return (
    <Box
      sx={pageStyles}
    >
      <Box
        width="100%"
        p="1rem 6%"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "30%" : "90%"}
        p="2rem"
        margin={isNonMobileScreens ? "5rem" : "5rem auto"}
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        sx = {{marginLeft: "auto"}}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
