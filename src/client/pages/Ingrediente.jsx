import { Box } from "@mui/material"
import { useLoaderData } from "react-router-dom"

export const Ingrediente = () => {
    const ingredient = useLoaderData()
    console.log(ingredient)

    return (
        <>
            <h2>{ingredient.originalName}</h2>
            <img src={ingredient.image}></img>
            <span>
                Quantidade por porção: {ingredient.nutrition.weightPerServing.amount} / {ingredient.nutrition.weightPerServing.unit}
            </span>
            <h2>Macro Nutrientes</h2>
            <div>Proteinas: {ingredient.nutrition.caloricBreakdown.percentProtein} %</div>
            <div>Gorduras: {ingredient.nutrition.caloricBreakdown.percentFat} %</div>
            <div>Carboidratos: {ingredient.nutrition.caloricBreakdown.percentCarbs} %</div>

            <h2>Valores Diarios</h2>
            <ul>
                {ingredient.nutrition.nutrients.map((nutrient, key) => (
                    nutrient.percentOfDailyNeeds >= 20 ?
                    <li>
                        <div>Nome: {nutrient.name}</div>
                        <div>Quantidade por porção: {nutrient.amount} / {nutrient.unit}</div>
                        <div>VD: {nutrient.percentOfDailyNeeds} % </div>
                    </li>
                    : <></>
                ))}
            </ul>
        </>



    )
}
