import express from 'express'; //Desacoplando o módulo de rotas do express
import buscarReceitasPorIngredientes from './controller/Receitas/buscarReceitasPorIngredientes.js'
import buscarReceitasPorNome from './controller/Receitas/buscarReceitasPorNome.js'
import buscarReceitasPorID from './controller/Receitas/buscarReceitasPorID.js'
import buscarReceitasPorInstrucoes from './controller/Receitas/buscarReceitasPorInstrucoes.js'
const routes = express.Router();

routes.get('/receitas/ingrediente', buscarReceitasPorIngredientes.index);
routes.get('/receitas/nome', buscarReceitasPorNome.index);
routes.get('/receitas/id', buscarReceitasPorID.index);
routes.get('/receitas/instrucoes', buscarReceitasPorInstrucoes.index);

export default routes
