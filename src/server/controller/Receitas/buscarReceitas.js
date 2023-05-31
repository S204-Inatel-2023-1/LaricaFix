import axios from 'axios';
import buscarReceitasMock from "./mocks/buscarReceitas.js";

export default async function (req, res) {
  try {
    let response 

    if (req.query.apiKey == 'undefined' || req.query.apiKey == undefined) {
      response = buscarReceitasMock()
      
    } else {
      const nome = req.query.nome || '';
      const ingredientes = req.query.ingredientes || '';
      const dietas = req.query.dietas || '';
      const intolerancias = req.query.intolerancias || '';
      const offset = req.query.offset || 0;
      const apiKey = req.query.apiKey

      let url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey}&offset=${offset}&number=25`
      if (nome.length)
        url = url.concat(`&query=${nome}`);
      if (ingredientes.length)
        url = url.concat(`&includeIngredients=${ingredientes}`);
      if (dietas.length)
        url = url.concat(`&diet=${dietas}`);
      if (intolerancias.length)
        url = url.concat(`&intolerances=${intolerancias}`);

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