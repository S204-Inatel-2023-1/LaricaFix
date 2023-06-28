import { FormReceitas, Listagem } from "../components";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts";
import { Favorites } from "../helper";
import { Typography } from "@mui/material";

export const FavoritosLista = () => {
    const [favoritos, setFavoritos] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user) return
        const newFavoritos = Favorites.get(user._id).map(f => ({
            id: f.id, name: f.name,
            image: f.image.includes("https") ? f.image : `https://spoonacular.com/cdn/ingredients_250x250/${f.image}`,
            type: f.image.includes("https") ? "recipe" : "ingredient"
        }))

        setFavoritos(newFavoritos)
    }, [user])

    return (<>
        {favoritos.length ?
            <>
                {
                    favoritos.filter(f => f.type == "recipe").length &&
                    <>
                        <Typography variant="h4" sx={{ textAlign: "center" }}>Receitas</Typography>
                        <Listagem itemsDaLista={favoritos.filter(f => f.type == "recipe")} url={"/receita/:id"} />
                    </>
                }

                {favoritos.filter(f => f.type == "ingredient").length &&
                    <>
                        <Typography variant="h4" sx={{ textAlign: "center" }}>Ingredientes</Typography>
                        <Listagem itemsDaLista={favoritos.filter(f => f.type == "ingredient")} url={"/ingrediente/:id"} />
                    </>
                }
            </>
            : <Typography variant="h4" sx={{ textAlign: "center" }}>Você não tem favoritos</Typography>
        }
    </>)
}