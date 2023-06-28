import React, { useEffect, useRef, useContext } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../contexts/';
export const Listagem = ({ itemsDaLista, url, update, cart }) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const ref = useRef(null)
    const goTo = (id) => {
        navigate(url.replace(":id", id))
    }
    const { logged } = useContext(UserContext)
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

    const alternarIngrediente = (item, adicionar) => {
        adicionar?
            cart.adicionarIngrediente(item):
            cart.removerIngrediente(item)
    }

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
                        }}>
                            <Box sx={{
                                width: '100%', aspectRatio: '1.35', backgroundImage: `url(${item.image})`,
                                backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '10px',
                                cursor: 'pointer'
                            }} onClick={() => goTo(item.id)}>
                            </Box>
                            <Typography>
                                {item.title}
                            </Typography>
                            {logged &&
                                <IconButton sx={{ position: "absolute", top: "0%", right: "0%" }}>
                                    <FavoriteIcon fontSize='large' sx={{ color: item.favorite ? theme.palette.error.light : theme.palette.background.paper }} stroke={theme.palette.text.primary} />
                                </IconButton>}
                            {cart &&
                                <IconButton sx={{ position: "absolute", bottom: "0%", right: "0%" }} onClick={()=>alternarIngrediente(item, !cart.getIds().includes(item.id))}>
                                    {!cart.getIds().includes(item.id) ?
                                        <AddBoxIcon fontSize='medium' sx={{ color: theme.palette.text.primary }} /> :
                                        <IndeterminateCheckBoxIcon fontSize='medium' sx={{ color: theme.palette.text.primary }} />
                                    }
                                </IconButton>}
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </>
    )
}
