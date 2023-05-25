import axios from 'axios';
import buscarIngredientesPorNomeMock from "./mocks/buscarIngredientesPorNome.js";

export default async function (req, res, next) {
  try {

    if (req.query.apiKey == 'undefined') {
      await buscarIngredientesPorNomeMock(req, res)
      return next()
    }

    const query = req.query.nome
    const number = req.query.quantidade
    const apiKey = req.query.apiKey

    const url = `https://api.spoonacular.com/food/ingredients/search?query=${query}&number=${number}&apiKey=${apiKey}`
    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error);
  }
}