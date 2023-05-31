//React Functions
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom";

// Material components
import { Card, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, List, ListItemText, Paper, Typography } from "@mui/material"

//Material Icons
import TimerIcon from '@mui/icons-material/Timer';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const Receita = () => {

    const recipe = useLoaderData()

    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        setFavorite(!favorite)
    }

    useEffect(() => {
        document.title = recipe.title
    }, [])

    return (
        <Grid container spacing={5} columnGap={5}>
            <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: 'transparent',
                             height:'100%' }}>
                    <CardHeader title={recipe.title} sx={{ textAlign: 'center' }} />

                    <CardMedia
                        component="img"
                        height="194"
                        image={recipe.image}
                        alt={recipe.title}
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Chip icon={<TimerIcon />} label={`Tempo de Preparo ${recipe.readyInMinutes} minutos `} sx={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Chip icon={<RestaurantMenuIcon />} label={`Serve ${recipe.servings} pessoas`} sx={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {recipe.veget2arian ? <Chip icon={<DoneIcon />} label={`Vegetariano`} color="success" sx={{ width: '100%' }} /> : <Chip icon={<ClearIcon />} label={`Vegetariano`} color="error" sx={{ width: '100%' }} />}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {recipe.dairyFree ? <Chip icon={<DoneIcon />} label={`Sem Lactose`} color="success" sx={{ width: '100%' }} /> : <Chip icon={<ClearIcon />} label={`Sem Lactose`} color="error" sx={{ width: '100%' }} />}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                {recipe.vegan ? <Chip icon={<DoneIcon />} label={`Vegano`} color="success" sx={{ width: '100%' }} /> : <Chip icon={<ClearIcon />} label={`Vegano`} color="error" sx={{ width: '100%' }} />}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {recipe.glutenFree ? <Chip icon={<DoneIcon />} label={`Sem Glutem`} color="success" sx={{ width: '100%' }} /> : <Chip icon={<ClearIcon />} label={`Sem Glutem`} color="error" sx={{ width: '100%' }} />}
                            </Grid>

                            <Grid item xs={12}>
                                <Chip
                                    icon={favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    onClick={toggleFavorite} label={favorite ? "Adicionado aos favoritos" : "Adicionar aos favoritos"}
                                    color="primary" sx={{ width: '100%' }} />
                            </Grid>

                        </Grid>



                    </CardContent>
                </Card>
            </Grid>

            <Grid item md xs={12}>
                <Paper sx={{height:'100%'}}>
                    <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
                        Ingredientes
                    </Typography>

                    <List dense>
                        {recipe.extendedIngredients.map((i) => (
                            <ListItemText primary={i.aisle}
                                secondary={i.unit ?
                                    <>{i.measures.metric.amount} {i.measures.metric.unitShort} </> :
                                    <>{i.measures.us.amount} {i.measures.us.unitShort}</>}>
                            </ListItemText>))
                        }
                    </List>
                </Paper>
            </Grid>

            {recipe.analyzedInstructions && <Grid item lg={5} xs={12} md={12}>
            <Paper>
                <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
                    Modo de Preparo
                </Typography>

                {recipe.analyzedInstructions.map((instruction, i) => (
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

                        <br />
                    </>
                ))}
                </Paper>

            </Grid>
            }


        </Grid>
    )
}
