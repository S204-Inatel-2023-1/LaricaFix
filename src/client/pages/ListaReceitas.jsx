import { FormReceitas } from "../components";
import { useState } from "react";
import { Listagem } from "../components/Listagem";



export const ListaReceitas = () => {
    const [receitas, setReceitas] = useState([])

    return (<>
        <FormReceitas setReceitas={setReceitas} />
        <Listagem itemsDaLista={receitas} url={"/receita/:id"}/>
    </>)
}