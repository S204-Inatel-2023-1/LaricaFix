import { FormReceitas, Listagem } from "../components";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

export const ListaReceitas = () => {
    const [receitas, setReceitas] = useState([])
    const [requestUrl, setRequestUrl] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [isOver, setIsOver] = useState(false)

    useEffect(() => {
        if (!requestUrl) return
        fetch(requestUrl)
            .then(res => res.json())
            .then(res => {
                if (res.number + res.offset > res.totalResults) setIsOver(true)
                return res
            })
            .then(res => setReceitas(prev => {
                if (requestUrl.includes("offset"))
                    return [...prev, ...res.results]
                return res.results
            }))
            .then(() => setIsUpdating(false))
    }, [requestUrl])

    useEffect(() => {
        if (!isUpdating || !requestUrl.length) return
        const newUrl = new URL(requestUrl)
        newUrl.searchParams.set("offset", receitas.length)
        setRequestUrl(newUrl.href)
    }, [isUpdating])

    const search = (url) => {
        setIsOver(false)
        setRequestUrl(url)
    }

    const update = () => {
        if (isUpdating) return;
        setIsUpdating(true)
    }

    return (<>
        <FormReceitas setUrl={search} />
        <Listagem itemsDaLista={receitas} url={"/receita/:id"} update={update} />
        {isUpdating && !isOver &&
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
    </>)
}