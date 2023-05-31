import { Card, CardContent, CardHeader, CardMedia, Chip, Grid, Paper, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EggIcon from '@mui/icons-material/Egg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Ingrediente = () => {
    const ingredient = useLoaderData()

    const [favorite, setFavorite] = useState(false)

    const toggleFavorite = () => {
        setFavorite(!favorite)
    }

    const columns = [
        { field: 'nome', headerName: 'Nome', width: 100 },
        { field: 'qtd', headerName: 'Qtd / Porção',width:200  },
        { field: 'vd', headerName: 'Valores Diarios (%)',width:200 },
    ]

    useEffect(() => {
        document.title = ingredient.name
    }, [])

    function getRows() {
        let rows = []
        ingredient.nutrition.nutrients.forEach(nutrient => {
            if (nutrient.percentOfDailyNeeds >= 20) {
                let aux = {
                    id: rows.length,
                    nome: nutrient.name,
                    qtd: `${nutrient.amount} / ${nutrient.unit}`,
                    vd: nutrient.percentOfDailyNeeds
                }

                rows.push(aux)
            }
        })

        return rows
    }





    return (
        <>
            <Grid container spacing={5} columnGap={5}>
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        backgroundColor: 'transparent',
                        height: '100%'
                    }}>
                        <CardHeader title={ingredient.originalName} sx={{ textAlign: 'center' }} />

                        <CardMedia
                            component="img"
                            height="194"
                            image={ingredient.image}
                            alt={ingredient.title}
                        />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Chip icon={<RestaurantMenuIcon />} label={`Quantidade por porção: ${ingredient.nutrition.weightPerServing.amount} / ${ingredient.nutrition.weightPerServing.unit}`} sx={{ width: '100%' }} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography sx={{ textAlign: 'center' }} variant="h6" component="div">
                                        Macro Nutrientes
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip icon={<EggIcon />} label={`Proteinas: ${ingredient.nutrition.caloricBreakdown.percentProtein} %`} sx={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip icon={<FastfoodIcon />} label={`Gorduras: ${ingredient.nutrition.caloricBreakdown.percentFat} %`} sx={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Chip icon={<BreakfastDiningIcon />} label={`Carboidratos: ${ingredient.nutrition.caloricBreakdown.percentCarbs} %`} sx={{ width: '100%' }} />
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
                    <Paper sx={{ padding: '10px', overflowY: 'auto', maxHeight: '525px', minHeight: '525px' }}>
                        <Typography sx={{ mt: 1, mb: 2, textAlign:'center' }} variant="h6" component="div">
                            Valores Diarios
                        </Typography>
                        <DataGrid
                            rows={getRows()}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 6 },
                                },
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )

}