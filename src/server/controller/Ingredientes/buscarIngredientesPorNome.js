import axios from 'axios';

export default async function (req, res) {
  try {
    const query = req.query.nome
    const number = req.query.quantidade
    const url = "https://api.spoonacular.com/food/ingredients/search?query=" + query + "&number=" + number + "&apiKey=" + process.env.SPOONACULAR_KEY
    const response = await axios.get(url);
    res.set("x-api-quota-request", response.headers["x-api-quota-request"]);
    res.set("x-api-quota-used", response.headers["x-api-quota-used"]);
    res.set("x-api-quota-left", response.headers["x-api-quota-left"]);
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error);
  }
}