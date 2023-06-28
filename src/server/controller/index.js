import buscarIngredientesPorParam from './Ingredientes/buscarIngredientesPorParam.js';
import buscarReceitasPorID from "./Receitas/buscarReceitasPorID.js";
import buscarReceitas from "./Receitas/buscarReceitas.js";
import criarUsuario from './Usuario/criarUsuario.js';
import buscarUsuario from './Usuario/buscarUsuario.js';
import removerUsuario from './Usuario/removerUsuario.js';

const usedRoutes = {
    buscarIngredientesPorParam,
    buscarReceitasPorID,
    buscarReceitas,
    criarUsuario,
    buscarUsuario,
    removerUsuario
}

export default {
    ...usedRoutes,
}