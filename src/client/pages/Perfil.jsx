import { Box, Avatar, Skeleton, Typography } from "@mui/material"
import { useContext, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from "../contexts";

export const Perfil = () => {
    const [imageLoaded, setImageLoaded] = useState(true)
    const UserContextData = useContext(UserContext)
    const user = UserContextData.user
    return (
        <Box sx={{width:"60%", m: '3em auto', display:'flex', gap:"20px", alignItems:'center', backgroundColor: "background.paper", borderRadius: "30px", position:"relative"}}>
            <Box sx={{position:"absolute", top:"20px", right:"20px", cursor:"pointer"}}>
                <EditIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box sx={{ width: "40%", aspectRatio: '1', p:8 }}>
                {!imageLoaded ?
                    <Skeleton variant="circular" sx={{ width: "100%", height: "100%" }} /> :
                    <Avatar sx={{ width: "100%", height: "100%" }}></Avatar>
                }
            </Box>
            <Box>
                <Typography variant="h3" sx={{ fontWeight: "600", }}>
                    {user.nome}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "300", }}>
                    {user.email}
                </Typography>

            </Box>
        </Box>
    )
}