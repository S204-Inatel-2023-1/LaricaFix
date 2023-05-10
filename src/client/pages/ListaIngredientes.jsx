import { useState } from "react"
import { FormIngredientes, Listagem } from "../components"

export const ListaIngredientes = () => {
    const [ingredientes, setIngredientes] = useState([])

    return (<>
        <FormIngredientes setIngredientes={setIngredientes} />
        <Listagem itemsDaLista={ingredientes} url={"/ingrediente/:id"}/>
    </>)
}
