import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { colorTokens } from "theme";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 821px)");

  useEffect(() => {
    if (!isNonMobileScreens) {
      // For small devices, set the background image on the html and body elements
      document.documentElement.style.background = `url('/assets/wp9215875.webp') no-repeat center center fixed`;
      document.documentElement.style.backgroundSize = "cover";
      document.body.style.background = "none";
    } else {
      // For desktop screens, reset the background to default
      document.documentElement.style.background = `url('/assets/wp9215875.webp') no-repeat center center fixed`;
      document.documentElement.style.backgroundSize = "cover";
      document.body.style.background = "none";
    }
  }, [isNonMobileScreens]);
  
  return (
    <>
    <div id="pointer-trail"></div>
  <Box>
      {isNonMobileScreens ? ( // For desktop devices, grid display
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"header header sidebar sidebar"
                              "main main sidebar sidebar"
                              "main main sidebar sidebar"`,
            marginLeft: "5rem",
          }}
        >
          <Box
            sx={{
              gridArea: "header",
              marginTop: "2rem",
            }}
          >
            <img
              src="/assets/logo.png"
              alt="PulseWave Logo"
              style={{
                width: "18rem",
                height: "auto",
              }}
            />
          </Box>

          <Box
            sx={{
              gridArea: "main",
              mx: "auto",
              textAlign: "left",
              width: "auto",
            }}
          >
            <Typography variant="login" color={colorTokens.login.txt}>
              Join Millions on PulseWave – The Social Hub of Tomorrow!
            </Typography>
          </Box>

          <Box
            p="2rem"
            backgroundColor={colorTokens.login.bg}
            sx={{
              gridArea: "sidebar",
              height: "100vh",
              width: "75%",
              margin: "0rem",
              marginLeft: "auto",
              color: colorTokens.login.txt,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form />
          </Box>
        </Box>
      ) : (
        // For small devices, flex display
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",
            margin: "1rem",
            marginTop: "auto",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="PulseWave Logo"
            style={{
              width: "18rem",
              height: "auto",
              marginTop: "2rem",
            }}
          />
          <Box
            sx={{
              width: "auto",
              color: colorTokens.login.txt,
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            <Typography variant="login" color={colorTokens.login.txt} fontSize="2rem">
              Join Millions on PulseWave – The Social Hub of Tomorrow!
            </Typography>
          </Box>
          <Box
            p="2rem"
            backgroundColor={colorTokens.login.bg}
            sx={{
              width: "90%",
              height: "auto",
              color: colorTokens.login.txt,
              textAlign: "center",
              marginTop: "3rem",
              borderRadius: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form />
          </Box>
        </Box>
      )}
    </Box>
    </>
  );
};

export default LoginPage;
