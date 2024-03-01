import * as React from 'react';
import { Typography, Card, useTheme } from "@mui/material";
import styled from '@emotion/styled';

const CategoryCard = ({ title }) => {
    const { palette } = useTheme();

    // Styled component for the Card
    const StyledCard = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    background: ${palette.background.alt};
    border: 6px solid transparent;
    box-shadow: none;
    transition: border 0.1s ease-in-out;

    /* Hover State Styles */
    &:hover {
        border-image: linear-gradient(45deg, gold, deeppink) 1;
        clip-path: inset(0px round 6px);
        filter: hue-rotate(360deg);
        animation: huerotate 3s infinite linear;
    }

    /* Animation */
    @keyframes huerotate {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }
    `;
    return (
        <StyledCard>
            <Typography
                    variant="h6"
                    align='center'
                    sx={{
                        color: '#cacaca',
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                    }}
                >
                {title}
            </Typography>
        </StyledCard>
    );
};

export default CategoryCard;