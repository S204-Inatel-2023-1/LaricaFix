import express from 'express'; //Desacoplando o módulo de rotas do express
import * as mock from './controllerMock/index.js'
import * as prod from './controller/index.js'

const routes = express.Router();

const spoonacularKey = process.env.SPOONACULAR_KEY || '';

const usedRoutes = spoonacularKey.length? prod.default : mock.default;

//Receitas
routes.get('/receitas', usedRoutes.receitas.buscarReceitas);
routes.get('/receitas/id', usedRoutes.receitas.buscarReceitasPorID);

//Ingredientes

//Usuario
export default routes
