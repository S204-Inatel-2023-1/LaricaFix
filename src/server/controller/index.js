import buscarIngredientesPorNome from './Ingredientes/buscarIngredientesPorNome.js';
import buscarReceitasPorID from "./Receitas/buscarReceitasPorID.js";
import buscarReceitas from "./Receitas/buscarReceitas.js";

const usedRoutes = {
    buscarIngredientesPorNome,
    buscarReceitasPorID,
    buscarReceitas
}

export default {
    ...usedRoutes,
}