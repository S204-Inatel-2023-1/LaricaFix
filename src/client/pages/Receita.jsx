import { useEffect, useState } from "react"

import { InformacoesReceita as rec } from "../constants/InformacoesReceita"
import { Card, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, List, ListItemText, Typography } from "@mui/material"
import ListItem from '@mui/material/ListItem';
import TimerIcon from '@mui/icons-material/Timer';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const Receita = () => {



    useEffect(() => {
        document.title = rec.title
    }, [])

    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        setFavorite(!favorite)
    }

    return (
        <Grid container spacing={5} columnGap={5}>
            <Grid item xs={4}>
                <Card sx={{ backgroundColor: 'transparent' }}>
                    <CardHeader title={rec.title} />

                    <CardMedia
                        component="img"
                        height="194"
                        image={rec.image}
                        alt={rec.title}
                    />
                    <CardContent>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                                <Chip icon={<TimerIcon />} label={`Tempo de Preparo ${rec.readyInMinutes} minutos `} /> <br />
                            </Grid>
                            <Grid item xs={12}>
                                <Chip icon={<RestaurantMenuIcon />} label={`Serve ${rec.servings} pessoas`} /><br />
                            </Grid>
                            <Grid item xs={6}>
                                {rec.vegetarian ? <Chip icon={<DoneIcon />} label={`Vegetariano`} color="success" /> : <Chip icon={<ClearIcon />} label={`Vegetariano`} color="error" />}
                            </Grid>

                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}>
                                {rec.dairyFree ? <Chip icon={<DoneIcon />} label={`Sem Lactose`} color="success" /> : <Chip icon={<ClearIcon />} label={`Sem Lactose`} color="error" />}
                            </Grid>
                            <Grid item xs={6}>
                                {rec.vegan ? <Chip icon={<DoneIcon />} label={`Vegano`} color="success" /> : <Chip icon={<ClearIcon />} label={`Vegano`} color="error" />} <br />
                            </Grid>
                            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={6}>
                                {rec.glutenFree ? <Chip icon={<DoneIcon />} label={`Sem Glutem`} color="success" /> : <Chip icon={<ClearIcon />} label={`Sem Glutem`} color="error" />}
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Chip
                                    icon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    onClick={toggleFavorite} label={favorite ? "Adicionado aos favoritos" : "Adicionar aos favoritos"}
                                    color="primary" />
                            </Grid>
                        </Grid>


                    </CardContent>
                </Card>
            </Grid>

            <Divider orientation="vertical" flexItem variant="middle" />

            <Grid item xs>
                <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
                    Ingredientes
                </Typography>

                <List dense>
                    {rec.extendedIngredients.map((i) => (
                        <ListItemText primary={i.aisle}
                            secondary={i.unit ?
                                <>{i.measures.metric.amount} {i.measures.metric.unitShort} </> :
                                <>{i.measures.us.amount} {i.measures.us.unitShort}</>}>
                        </ListItemText>))
                    }
                </List>


            </Grid>

            {rec.analyzedInstructions && <Grid item xs={5}>
                <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
                    Modo de Preparo
                </Typography>

                {rec.analyzedInstructions.map((instruction) => (
                    <>
                        {instruction.name && <>
                            <Typography sx={{ mt: 1, mb: 2 }} variant="h7" component="div">
                                {instruction.name}
                            </Typography>
                        </>}

                        <List dense>
                            {instruction.steps.map((stepInfo) => (
                                <ListItemText primary={stepInfo.step} />
                            ))}
                        </List >

                        <br/>
                    </>
                ))}

            </Grid>
            }


        </Grid>
    )
}
