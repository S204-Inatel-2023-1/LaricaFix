import { useState, useEffect, useContext } from "react"
import { FormIngredientes, Listagem } from "../components"
import { Box, CircularProgress } from "@mui/material"
import { QuotaContext, CartContext } from "../contexts"

export const ListaIngredientes = () => {
    const [ingredientes, setIngredientes] = useState([])
    const [requestUrl, setRequestUrl] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const { setUsedQuota } = useContext(QuotaContext)
    const cart = useContext(CartContext)

    useEffect(() => {
        if (!requestUrl) return
        fetch(requestUrl)
            .then(res => {
                setUsedQuota(res.headers.get("x-api-quota-used"))
                return res.json()
            })
            .then(res => {
                if (res.number + res.offset > res.totalResults) setIsOver(true)
                res.results.map(ing => ing.image = "https://spoonacular.com/cdn/ingredients_500x500/" + ing.image)
                res.results.map(ing => ing.title = ing.name)
                setIngredientes(prev => {
                    if (requestUrl.includes("offset"))
                        return [...prev, ...res.results]
                    return res.results
                })
                setIsUpdating(false)
            })
    }, [requestUrl]) 

    useEffect(() => {
        if (!isUpdating || !requestUrl.length) return
        const newUrl = new URL(requestUrl)
        newUrl.searchParams.set("offset", ingredientes.length)
        setRequestUrl(newUrl.href)
    }, [isUpdating])

    const search = (url) => {
        setIsOver(false)
        setRequestUrl(url)
    }

    const update = () => {
        if (isUpdating || isOver) return;
        setIsUpdating(true)
    }

    return (<>
        <FormIngredientes setUrl={search} limpar={cart.limparCarrinho}/>
        <Listagem itemsDaLista={ingredientes} url={"/ingrediente/:id"} update={update} cart={cart}/>
        {isUpdating && !isOver &&
            <Box sx={{ width: "100%", height: "20vh", display: 'grid', placeContent: "center" }}>
                <CircularProgress />
            </Box>}
    </>)
}
