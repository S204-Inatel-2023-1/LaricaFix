export default async function (req, res) {
  const nome = req.query.nome || '';
  const ingredientes = req.query.ingredientes || '';
  const dietas = req.query.dietas || '';
  const intolerancias = req.query.intolerancias || '';

  const requestUrl = new URL("https://api.spoonacular.com/recipes/complexSearch?apiKey=" + process.env.SPOONACULAR_KEY)

  if (nome.length)
    requestUrl.searchParams.append('query', nome);
  if (ingredientes.length)
    requestUrl.searchParams.append('includeIngredients', ingredientes);
  if (dietas.length)
    requestUrl.searchParams.append('diet', dietas);
  if (intolerancias.length)
    requestUrl.searchParams.append('intolerances', intolerancias);

  fetch(requestUrl.href).then(response => response.json()).then(data => {
    res.status(200).json(data)
  })
}