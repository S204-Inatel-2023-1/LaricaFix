import axios from 'axios';
import buscarIngredientesPorNomeMock from "./mocks/buscarIngredientesPorNome.js";
import buscarIngredientesPorIDMock from "./mocks/buscarIngredientesPorID.js";

export default async function (req, res) {
  try {
    let response
    let url
    const apiKey = req.query.apiKey
    const offset = req.query.offset || 0;
    const query = req.params.param

    if (req.query.apiKey == 'undefined' || req.query.apiKey == undefined) {
      if (isNaN(query)){  // Se não for um número é pq o param é o nome do ingrediente
        response =  buscarIngredientesPorNomeMock()
      } else {
        response = buscarIngredientesPorIDMock()
      }
    } else {
      if (isNaN(query)){
        url = `https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&offset=${offset}&number=25&query=${query}`
      } else{
        url = `https://api.spoonacular.com/food/ingredients/${query}/information?apiKey=${apiKey}&amount=100&unit=grams`
      } 
      response = await axios.get(url);
    }

    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200)
    res.json(response.data)
  } catch (error) {
    console.error(error);
  }
}