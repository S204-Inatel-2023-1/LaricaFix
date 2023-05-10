import { useEffect } from "react"

import { InformacoesReceita as rec } from "../constants/InformacoesReceita"
import parse from "html-react-parser"

export const Receita = () => {



    useEffect(() => {
        document.title = rec.title
    }, [])


    return (
        <>
            <div>
                <h1>{rec.title}</h1>

                <summary>{parse(rec.summary)}</summary>

                <img src={rec.image}></img>
                <div>
                    <h1>Ingredientes</h1>
                    {rec.extendedIngredients.map((i) => (
                        <>
                            <span>Ingrediente: {i.aisle}</span>
                            {i.unit && <span> / Quantidade: {i.measures.metric ?
                                <span> {i.measures.metric.amount} {i.measures.metric.unitShort}</span>
                                : <span>{i.measures.us.amount} {i.measures.us.unitShort}</span>
                            }</span>}

                            <br />
                        </>
                    ))}
                </div>

                <div>
                    {rec.instructions &&
                        <h1>Modo de Preparo</h1>}
                    {rec.analyzedInstructions.length !== 1 &&
                        rec.analyzedInstructions.map((i) => (
                            <>
                                <h2>{i.name}</h2>
                                {i.steps.map((s) => (
                                    <li>{s.step}</li>
                                ))}
                            </>

                        ))
                    }

                    {rec.analyzedInstructions.length === 1 &&
                        rec.analyzedInstructions[0].steps.map((s) => (
                            <li>{s.step}</li>
                        ))
                    }

                    <span>Vegetariano: {rec.vegetarian ? "Sim": "Não"}</span>
                    <span>Vegano: {rec.vegan ? "Sim": "Não"}</span>
                    <span>Sem lactose: {rec.dairyFree ? "Sim": "Não"}</span>
                    <span>Sem gluten: {rec.glutenFree ? "Sim": "Não"}</span>
                    <span>Tempo de Preparo {rec.preparationMinutes > 0 ? rec.preparationMinutes : "-"}</span>
                    <span>Serve {rec.servings} pessoas</span>
                </div>

                <button>Adicionar Favorito</button>
            </div>
        </>
    )
}
