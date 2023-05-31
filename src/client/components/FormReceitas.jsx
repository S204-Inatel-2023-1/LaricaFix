import { TextField, Button, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { MulticheckSelect } from './';
import { Dietas, Intolerancias } from '../constants';

const apiKey = import.meta.env.VITE_SPOONACULAR_KEY || ""

export const FormReceitas = ({ setUrl }) => {
    const [pesquisa, setPesquisa] = useState("");
    const [carrinho, setCarrinho] = useState(false);
    const [dietasSelecionadas, setDietasSelecionadas] = useState([]);
    const [intoleranciasSelecionadas, setIntoleranciasSelecionadas] = useState([]);

    const searchRecipes = () => {
        const requestUrl = new URL("../api/receitas", document.baseURI)
        if (pesquisa.length)
            requestUrl.searchParams.append("nome", pesquisa)
        // if (carrinho)
        //     requestUrl.searchParams.append("carrinho", carrinho)
        if (dietasSelecionadas.length)
            requestUrl.searchParams.append("dietas", dietasSelecionadas.join("|"))
        if (intoleranciasSelecionadas.length)
            requestUrl.searchParams.append("intolerancias", intoleranciasSelecionadas.join(","))

        requestUrl.searchParams.append("apiKey", apiKey)
        setUrl(requestUrl.href)
    };

    return (
        <FormControl component="fieldset" sx={{ width: '100%', backgroundColor: "background.paper", padding: 2 }}>
            <FormLabel component="legend">Buscar Receitas</FormLabel>
            <FormGroup aria-label="position" row sx={{ width: '100%', py: 1 }}>
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    sx={{ width: '100%' }}
                    onChange={(e) => setPesquisa(e.target.value)}
                />
            </FormGroup>
            <FormGroup aria-label="position" row sx={{ width: '100%', display: "flex", justifyContent: "start" }}>
                <FormControlLabel
                    control={<Checkbox onChange={(e) => setCarrinho(e.target.checked)} />}
                    label="Incluir ingredientes do carrinho"
                    labelPlacement="end"
                    sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1, maxWidth: "100%" }}>
                    <MulticheckSelect options={Dietas} label={'Dietas'} selected={dietasSelecionadas} setSelected={setDietasSelecionadas} />
                    <MulticheckSelect options={Intolerancias} label={'Intolerancias'} selected={intoleranciasSelecionadas} setSelected={setIntoleranciasSelecionadas} />
                </div>
                <Button variant="contained" sx={{ width: { xs: '100%', md: '20%' }, minWidth: "fit-content", flexGrow: 1 }} onClick={searchRecipes}>Buscar</Button>
            </FormGroup>
        </FormControl>
    )
}
