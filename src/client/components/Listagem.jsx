import React from 'react'
import { Box, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export const Listagem = ({ itemsDaLista, url }) => {
    const navigate = useNavigate()
    const goTo = (id) => {
        console.log(url.replace(":id", id))
        navigate(url.replace(":id", id))
    }
    return (
        <Box sx={{
            width: '100%', p: 2,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            flexWrap: 'wrap', gap: 3
        }}>
            {itemsDaLista.map((item) => (
                <Tooltip title={item.title} placement="top" key={item.id}>
                    <Box key={item.id} sx={{
                        width: '18%', aspectRatio: '1.35', backgroundImage: `url(${item.image})`,
                        backgroundPosition: 'center', backgroundSize: '', borderRadius: '10px',
                        cursor: 'pointer'
                    }} onClick={()=>goTo(item.id)}>
                    </Box>
                </Tooltip>
            ))}
        </Box>
    )
}
