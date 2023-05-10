import buscarIngredientes from './Ingredientes/buscarIngredientes.js';
import buscarIngredientesPorID from './Ingredientes/buscarIngredientesPorID.js';
import buscarIngredientesPorNome from './Ingredientes/buscarIngredientesPorNome.js';
import buscarReceitasPorID from "./Receitas/buscarReceitasPorID.js";
import buscarReceitas from "./Receitas/buscarReceitas.js";
import buscarFavoritos from "./Usuario/buscarFavoritos.js"
import buscarUsuario from "./Usuario/buscarUsuario.js"
import criarUsuario from "./Usuario/criarUsuario.js"
import editarUsuario from "./Usuario/editarUsuario.js"
import buscarHistorico from "./Usuario/buscarHistorico.js"

import buscarIngredientesMock from './Ingredientes/mocks/buscarIngredientes.js';
import buscarIngredientesPorIDMock from './Ingredientes/mocks/buscarIngredientesPorID.js';
import buscarIngredientesPorNomeMock from './Ingredientes/mocks/buscarIngredientesPorNome.js';
import buscarReceitasPorIDMock from "./Receitas/mocks/buscarReceitasPorID.js";
import buscarReceitasMock from "./Receitas/mocks/buscarReceitas.js";
import buscarFavoritosMock from "./Usuario/mocks/buscarFavoritos.js"
import buscarUsuarioMock from "./Usuario/mocks/buscarUsuario.js"
import criarUsuarioMock from "./Usuario/mocks/criarUsuario.js"
import editarUsuarioMock from "./Usuario/mocks/editarUsuario.js"
import buscarHistoricoMock from "./Usuario/mocks/buscarHistorico.js"

const prod = {
    buscarIngredientes,
    buscarIngredientesPorID,
    buscarIngredientesPorNome,
    buscarReceitasPorID,
    buscarReceitas,
    buscarFavoritos,
    buscarUsuario,
    criarUsuario,
    editarUsuario,
    buscarHistorico
}

const mock = {
    buscarIngredientes: buscarIngredientesMock,
    buscarIngredientesPorID: buscarIngredientesPorIDMock,
    buscarIngredientesPorNome: buscarIngredientesPorNomeMock,
    buscarReceitasPorID: buscarReceitasPorIDMock,
    buscarReceitas: buscarReceitasMock,
    buscarFavoritos: buscarFavoritosMock,
    buscarUsuario: buscarUsuarioMock,
    criarUsuario: criarUsuarioMock,
    editarUsuario: editarUsuarioMock,
    buscarHistorico: buscarHistoricoMock
}

const spoonacularKey = process.env.SPOONACULAR_KEY || '';
const usedRoutes = spoonacularKey != '' ? prod : mock;
console.log("Executando com dados de", spoonacularKey != '' ? "prod" : "mock")
export default {
    ...usedRoutes,
}