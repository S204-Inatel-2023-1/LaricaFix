import express from 'express'; //Desacoplando o módulo de rotas do express
import controller from './controller/index.js'

const routes = express.Router();

//Receitas
routes.get('/receitas', controller.buscarReceitas);
routes.get('/receitas/:id', controller.buscarReceitasPorID);

//Ingredientes
routes.get('/ingredientes/:param', controller.buscarIngredientesPorParam);

//Usuario
routes.post('/usuario', controller.criarUsuario)
routes.get('/usuario', controller.buscarUsuario)
routes.delete('/usuario', controller.removerUsuario)
export default routes
