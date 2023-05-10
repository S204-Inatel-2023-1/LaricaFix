import { FormReceitas, Listagem } from "../components";
import { useState } from "react";


export const ListaReceitas = () => {
    const [receitas, setReceitas] = useState([])

    return (<>
        <FormReceitas setReceitas={setReceitas} />
        <Listagem itemsDaLista={receitas} url={"/receita/:id"}/>
    </>)
}