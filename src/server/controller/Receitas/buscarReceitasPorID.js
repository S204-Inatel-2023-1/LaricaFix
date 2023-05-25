import axios from 'axios';
import buscarReceitasPorIDMock from "./mocks/buscarReceitasPorID.js";

export default async function (req, res, next) {
  try {

    if (req.query.apiKey == 'undefined') {
      await buscarReceitasPorIDMock(req, res)
      return next()
    }

    const idPrato = req.query.idPrato
    const pag = req.query.pag || 0;
    const apiKey = req.query.apiKey

    const url = `https://api.spoonacular.com/recipes/${idPrato}/information?includeNutrition=true&number=25&offset=${pag}&apiKey=${apiKey}`
    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error);
  }
}