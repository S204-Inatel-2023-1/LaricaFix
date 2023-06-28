import { FormReceitas, Listagem } from "../components";
import { useEffect, useState, useContext } from "react";
import { Box, CircularProgress } from "@mui/material";
import { QuotaContext } from "../contexts";

export const ListaReceitas = () => {
    const [receitas, setReceitas] = useState([])
    const [requestUrl, setRequestUrl] = useState("")
    const [isUpdating, setIsUpdating] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const { setUsedQuota } = useContext(QuotaContext)

    useEffect(() => {
        if (!requestUrl) return
        fetch(requestUrl)
            .then(res => {
                setUsedQuota(res.headers.get("x-api-quota-used"))
                return res.json()
            })
            .then(res => {
                setReceitas(prev => {
                    if (res.number + res.offset > res.totalResults) setIsOver(true)
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
            <Box sx={{ width: "100%", height: "20vh", display: 'grid', placeContent: "center" }}>
                <CircularProgress />
            </Box>}
    </>)
}