import React from 'react'
import { Box, Typography } from '@mui/material'
import { Logo, Beringela, Brocoli, Queijo, Morango } from '../assets'
import { keyframes } from '@mui/system';

const slideIn = (xOffset = '-50%') => keyframes`
  from {
    opacity: 0;
    transform: translateX(${xOffset});
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const floatAnimation = (offSet = '3px') => keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(${offSet});
    }

    100% {
        transform: translateX(0);
    }
`;

const AnimatedComponent = ({ sx, component, animationProps }) => {
    return (
        <Box sx={{
            ...sx,
            animation: `${slideIn(animationProps.xOffSet)} 1s ease`
        }}>
            {component}
        </Box>
    );
};

export const Home = () => {
    return (
        <Box sx={{ width: '100%', height: "80vh", display: "flex", flexDirection: "column", alignItems: 'center', position: 'relative' }}>
            <Logo width="100%" height="90%" />
            <Box sx={{ textAlign: "end", width: { xs: "100%", sm: "80%", md: "40%" }, position: 'absolute', bottom: "20%", right: { xs: "0%", sm: "15%", md: "25%" } }}>
                <Typography variant="h4" sx={{ fontWeight: "600", color: "secondary.light" }}>
                    Deu aquela fome, mas tá sem dinheiro pro delivery?
                </Typography>
            </Box>

            <AnimatedComponent
                sx={{ position: "absolute", bottom: "15px", right: "10px", aspectRatio: 1, width: { xs: "200px", sm: "220px", md: "300px", lg: "350px" } }}
                component={<Box sx={{ animation: `${floatAnimation("15px")} 3s ease-in-out infinite` }}><Morango width="100%" height="100%" /></Box>}
                animationProps={{ xOffSet: "100px" }}
            />
            <AnimatedComponent
                sx={{ position: "absolute", bottom: { xs: '10px', sm: '30px', md: "75px" }, left: { xs: '0px', md: "50px" }, aspectRatio: 1, width: { xs: "200px", sm: "220px", md: "300px", lg: "350px" } }}
                component={<Box sx={{ animation: `${floatAnimation("20px")} 4s ease-in-out infinite` }}><Beringela width="100%" height="100%" /></Box>}
                animationProps={{ xOffSet: "-100px" }}
            />
            <AnimatedComponent
                sx={{ position: "absolute", top: { xs: '30px' }, right: { xs: '0px', md: "50px" }, aspectRatio: 1, width: { xs: "200px", md: "260px" } }}
                component={<Box sx={{ animation: `${floatAnimation("10px")} 2s ease-in-out infinite` }}><Queijo width="100%" height="100%" /></Box>}
                animationProps={{ xOffSet: "200px" }}
            />
            <AnimatedComponent
                sx={{ position: "absolute", top: { xs: '10px' }, right: { xs: "50%" }, aspectRatio: 1, width: { xs: "200px" } }}
                component={<Box sx={{ animation: `${floatAnimation("15px")} 3s ease-in-out infinite` }}><Brocoli width="100%" height="100%" /></Box>}
                animationProps={{ xOffSet: "-300px" }}
            />
        </Box >
    )
}