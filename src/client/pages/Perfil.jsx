import { Box, Avatar, Skeleton, Typography, Grid } from "@mui/material"
import { useContext, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from "../contexts";
import { fontWeight, height } from "@mui/system";

export const Perfil = () => {
    const [imageLoaded, setImageLoaded] = useState(true)
    const UserContextData = useContext(UserContext)
    const user = UserContextData.user
    return (
        <Grid container sx={{position:'absolute',margin:'auto', width:'80%', alignItems: 'center', backgroundColor: "background.paper", borderRadius: "30px", position: "relative", paddingBottom:'10px' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ width: "100%", aspectRatio: '1', p: 8, display:"flex", alignItems:'center'}}>
                    {!imageLoaded ?
                        <Skeleton variant="circular" /> :
                        <Avatar sx={{ width: "100%", height: "100%" }}></Avatar>
                    }
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box>
                    <Typography variant="h3" sx={{textAlign:'center', fontWeight:500, verticalAlign: 'middle'}}>
                        {user.nome}
                    </Typography>
                    <Typography sx={{textAlign:'center', fontWeight:300}}> 
                        {user.email}
                    </Typography>

                </Box>
            </Grid>
        </Grid>
    )
}