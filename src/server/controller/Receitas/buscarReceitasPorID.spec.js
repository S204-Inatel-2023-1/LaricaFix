import jest from 'jest-mock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import buscarReceitasPorID from './buscarReceitasPorID';
import buscarReceitasPorIDMock from './mocks/buscarReceitasPorID';

describe('Testando controller /receitas/:id', () => {

  let mock;
  let req;
  let res;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    req = {
      query: {},
      params: {},
    };
    res = {
      set: jest.fn(),
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    mock.restore();
  });

  it('Verificando que ao deixar de enviar a apiKey o controller envia o mock na resposta e não consulta o spoonacular', async () => {

    const respostaEsperada = buscarReceitasPorIDMock();

    // req.query.apiKey = '0000000' deixando de enviar a apiKey, logo o parametro req.query.apiKey receberá undefined
    req.params.id = '1'

    await buscarReceitasPorID(req, res);

    expect(res.set).toHaveBeenCalledWith('x-api-quota-request', respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-used', respostaEsperada.headers['x-api-quota-used']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-left', respostaEsperada.headers['x-api-quota-left']);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que ao enviar a apiKey como a string "undefined" o controller envia o mock na resposta e não consulta o spoonacular', async () => {
    const respostaEsperada = buscarReceitasPorIDMock();

    req.query.apiKey = 'undefined', // enviando a string "undefined", logo o parametro req.query.apiKey receberá 'undefined'
      req.params.id = '1'


    await buscarReceitasPorID(req, res);

    expect(res.set).toHaveBeenCalledWith('x-api-quota-request', respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-used', respostaEsperada.headers['x-api-quota-used']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-left', respostaEsperada.headers['x-api-quota-left']);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que ao enviar a apiKey com um valor coerente o controller deve consultar o spoonacular e repassar sua resposta', async () => {

    // Preparando o mock da consulta ao spoonacular
    const apiKey = '000000';
    const idPrato = '1'
    const respostaEsperada = {
      data: {
        id: 716429,
        title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
        imageType: "jpg",
        servings: 2,
        readyInMinutes: 45,
        license: "CC BY-SA 3.0",
        sourceName: "Full Belly Sisters",
        sourceUrl: "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
        spoonacularSourceUrl: "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
        healthScore: 19,
        spoonacularScore: 83,
        pricePerServing: 163.15,
        analyzedInstructions: [],
        cheap: false,
        creditsText: "Full Belly Sisters",
        cuisines: [],
        dairyFree: false,
        diets: [],
        gaps: "no",
        glutenFree: false,
        instructions: "",
        ketogenic: false,
        lowFodmap: false,
        occasions: [],
        sustainable: false,
        vegan: false,
        vegetarian: false,
        veryHealthy: false,
        veryPopular: false,
        whole30: false,
        weightWatcherSmartPoints: 17,
        dishTypes: [
          "lunch",
          "main course",
          "main dish",
          "dinner"
        ],
        extendedIngredients: [],
        summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        winePairing: {
          pairedWines: [
            "chardonnay",
            "gruener veltliner",
            "sauvignon blanc"
          ],
          pairingText: "Chardonnay, Gruener Veltliner, and Sauvignon Blanc are great choices for Pasta. Sauvignon Blanc and Gruner Veltliner both have herby notes that complement salads with enough acid to match tart vinaigrettes, while a Chardonnay can be a good pick for creamy salad dressings. The Buddha Kat Winery Chardonnay with a 4 out of 5 star rating seems like a good match. It costs about 25 dollars per bottle.",
          productMatches: [
            {
              id: 469199,
              title: "Buddha Kat Winery Chardonnay",
              description: "We barrel ferment our Chardonnay and age it in a mix of Oak and Stainless. Giving this light bodied wine modest oak character, a delicate floral aroma, and a warming finish.",
              price: "$25.0",
              imageUrl: "https://spoonacular.com/productImages/469199-312x231.jpg",
              averageRating: 0.8,
              ratingCount: 1,
              score: 0.55,
              link: "https://www.amazon.com/2015-Buddha-Kat-Winery-Chardonnay/dp/B00OSAVVM4?tag=spoonacular-20"
            }
          ]
        }
      },
      headers:{
        'x-api-quota-request': '10',
        'x-api-quota-used': '10',
        'x-api-quota-left': '140',
      }
    }

    const url = `https://api.spoonacular.com/recipes/${idPrato}/information?apiKey=${apiKey}&includeNutrition=true`;
    mock.onGet(url).reply(200, respostaEsperada.data, respostaEsperada.headers);

    // Realizando a requisição na rota /receitas desta API
    req.query.apiKey = apiKey
    req.params.id = idPrato

    await buscarReceitasPorID(req, res);

    expect(res.set).toHaveBeenCalledWith("x-api-quota-request", respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-used", respostaEsperada.headers["x-api-quota-used"]);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-left", respostaEsperada.headers["x-api-quota-left"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que caso haja um erro na chamada, este deverá ser apresentado no console', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    req.query.apiKey = '00000000';
    req.params.id = '1'
    const url = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${req.query.apiKey}&includeNutrition=true`;
    mock.onGet(url).reply(500);

    await buscarReceitasPorID(req, res);
    expect(console.error).toHaveBeenCalled();

    mock.onGet(url).reply(404);
    await buscarReceitasPorID(req, res);
    expect(console.error).toHaveBeenCalled();
  });
})