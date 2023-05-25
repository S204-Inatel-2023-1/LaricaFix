import axios from 'axios';
import buscarReceitasMock from "./mocks/buscarReceitas.js";

export default async function (req, res, next) {

  try {

    if (req.query.apiKey == 'undefined') {
      await buscarReceitasMock(req, res)
      return next()
    }

    const nome = req.query.nome || '';
    const ingredientes = req.query.ingredientes || '';
    const dietas = req.query.dietas || '';
    const intolerancias = req.query.intolerancias || '';
    const pag = req.query.pag || '';
    const apiKey = req.query.apiKey

    let url = "https://api.spoonacular.com/recipes/complexSearch?"
    if (nome.length)
      url = url.concat(`&query=${nome}`);
    if (ingredientes.length)
      url = url.concat(`&includeIngredients=${ingredientes}`);
    if (dietas.length)
      url = url.concat(`&diet=${dietas}`);
    if (intolerancias.length)
      url = url.concat(`&intolerances=${intolerancias}`);
    if (pag.length)
      url = url.concat(`&offset=${pag}`);
    if (apiKey.length)
      url = url.concat(`&apiKey=${apiKey}`);

    url = url.concat(`&number=25`);

    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)

  } catch (error) {
    console.error(error);
  }
}