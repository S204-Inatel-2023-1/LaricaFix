export default async function (req, res) {
  const idPrato = req.query.id

  const requestUrl = new URL("https://api.spoonacular.com/recipes/" + idPrato + "/information?apiKey=" + process.env.SPOONACULAR_KEY + "&includeNutrition=true")

  fetch(requestUrl.href).then(response => response.json()).then(data => {
    res.status(200).json(data)
  })
}