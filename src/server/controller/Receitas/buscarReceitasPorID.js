import axios from 'axios';
import buscarReceitasPorIDMock from "./mocks/buscarReceitasPorID.js";

export default async function (req, res) {
  try {
    let response

    if (req.query.apiKey == 'undefined' || req.query.apiKey == undefined) {
      response = buscarReceitasPorIDMock()

    } else {
      const idPrato = req.params.id
      const apiKey = req.query.apiKey
  
      const url = `https://api.spoonacular.com/recipes/${idPrato}/information?apiKey=${apiKey}&includeNutrition=true`
      response = await axios.get(url);
    }

    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error);
  }
}