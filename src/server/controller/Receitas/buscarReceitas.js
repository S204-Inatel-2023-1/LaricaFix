import axios from 'axios';

export default async function (req, res) {

  try {
    const nome = req.query.nome || '';
    const ingredientes = req.query.ingredientes || '';
    const dietas = req.query.dietas || '';
    const intolerancias = req.query.intolerancias || '';

    let url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + process.env.SPOONACULAR_KEY
    if (nome.length)
      url = url.concat(`&query=${nome}`);
    if (ingredientes.length)
      url = url.concat(`&includeIngredients=${ingredientes}`);
    if (dietas.length)
      url = url.concat(`&diet=${dietas}`);
    if (intolerancias.length)
      url = url.concat(`&intolerances=${intolerancias}`);
    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)

  } catch (error) {
    console.error(error);
  }
}