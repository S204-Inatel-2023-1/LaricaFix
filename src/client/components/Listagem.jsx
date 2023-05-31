import React, { useEffect, useRef } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

export const Listagem = ({ itemsDaLista, url, update }) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const ref = useRef(null)
    const goTo = (id) => {
        navigate(url.replace(":id", id))
    }

    function checkScrollToBottom() {
        var div = ref.current;
        var windowHeight = window.innerHeight;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var divOffsetTop = div.offsetTop;
        var divHeight = div.offsetHeight;
        if (scrollTop + windowHeight >= divOffsetTop + divHeight) {
            update();
        }
    }

    useEffect(() => {
        if (!ref.current || !update) return

        window.addEventListener('scroll', checkScrollToBottom);
        return () => {
            window.removeEventListener('scroll', checkScrollToBottom);
        };
    }, [ref]);


    return (
        <>
            <Box sx={{
                width: '100%', p: 2,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                flexWrap: 'wrap', gap: 3
            }} ref={ref}>
                {itemsDaLista.map((item) => (
                    <Tooltip title={item.title} placement="top" key={item.id}>
                        <Box sx={{
                            p: 2, width: { xs: "36%", md: "24%", lg: '18%' },
                            backgroundColor: "#FFF", borderRadius: '10px',
                            position: "relative",
                            border: "3px solid",
                            borderColor: "secondary.light"
                        }} onClick={() => goTo(item.id)}>
                            <Box sx={{
                                width: '100%', aspectRatio: '1.35', backgroundImage: `url(${item.image})`,
                                backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '10px',
                                cursor: 'pointer'
                            }} >
                            </Box>
                            <Typography>
                                {item.title}
                            </Typography>
                            <IconButton sx={{ position: "absolute", top: "0%", right: "0%" }}>
                                <FavoriteIcon fontSize='large' sx={{ color: item.favorite ? theme.palette.error.light : theme.palette.background.paper }} stroke={theme.palette.text.primary} />
                            </IconButton>
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </>
    )
}
