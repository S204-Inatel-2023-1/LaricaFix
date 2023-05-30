import buscarIngredientesPorParam from './Ingredientes/buscarIngredientesPorParam.js';
import buscarReceitasPorID from "./Receitas/buscarReceitasPorID.js";
import buscarReceitas from "./Receitas/buscarReceitas.js";

const usedRoutes = {
    buscarIngredientesPorParam,
    buscarReceitasPorID,
    buscarReceitas
}

export default {
    ...usedRoutes,
}