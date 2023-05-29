import axios from 'axios';
import buscarIngredientesPorNomeMock from "./mocks/buscarIngredientesPorNome.js";

export default async function (req, res, next) {
  try {

    if (req.query.apiKey == 'undefined' || req.query.apiKey == undefined) {
      await buscarIngredientesPorNomeMock(req, res)
      return next()
    }

    const query = req.params.nome
    const offset = req.query.offset || 0;
    const apiKey = req.query.apiKey

    const url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&offset=${offset}&number=25&query=${query}`
    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error);
  }
}