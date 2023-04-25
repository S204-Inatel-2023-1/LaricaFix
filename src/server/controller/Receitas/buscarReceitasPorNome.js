export default {
  async index(req, res) {
    const nomePrato = req.query.nome

    console.log('O prato desejados pelo cliente foi', nomePrato.toLocaleString())

    const response = {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    }

    res.status(200).json(response);
  }
}