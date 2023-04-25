export default {
  async index(req, res) {
    const idPrato = req.query.id

    console.log('O id do prato desejados foi', idPrato.toLocaleString())

    const response = {
      id: 716429,
      title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      readyInMinutes: 45,
      servings: 2,
      healthScore: 19,
      intolerances: {
        glutenFree: false,
        dairyFree: false
      },
      dishTypes: [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ],
      extendedIngredients: [
        {
          name: "butter",
          measures: {
            metric: {
              amount: 1,
              unitLong: "Tbsp",
              unitShort: "Tbsp"
            },
            us: {
              amount: 1,
              unitLong: "Tbsp",
              unitShort: "Tbsp"
            }
          },
          image: "butter-sliced.jpg",
          id: 1001,
        },
      ],
      summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome. If you like this recipe, take a look at these similar recipes: <a href=\"https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375\">Cauliflower Gratin with Garlic Breadcrumbs</a>, < href=\"https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437\">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738\">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a>.",
    }

    res.status(200).json(response);
  }

}