import React, { useState } from 'react'
import { TextField, Button, FormControl, FormLabel, FormGroup } from '@mui/material';

const apiKey = import.meta.env.VITE_SPOONACULAR_KEY || ""
export const FormIngredientes = ({ setUrl }) => {
    const [pesquisa, setPesquisa] = useState("");

    const searchIngredients = () => {
        const requestUrl = new URL("../api/ingredientes/" + encodeURI(pesquisa), document.baseURI)
        requestUrl.searchParams.append("apiKey", apiKey)

        setUrl(requestUrl.href)
    };

    return (
        <FormControl component="fieldset" sx={{ width: '100%', backgroundColor: "background.paper", padding: 2 }}>
            <FormLabel component="legend">Buscar Ingredientes</FormLabel>
            <FormGroup aria-label="position" row sx={{ width: '100%', py: 1, display: 'flex' }}>
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
                <Button variant="contained" sx={{ width: { xs: '100%', md: '20%' }, minWidth: "fit-content" }} onClick={searchIngredients}>Buscar</Button>
            </FormGroup>
        </FormControl>
    )
}
