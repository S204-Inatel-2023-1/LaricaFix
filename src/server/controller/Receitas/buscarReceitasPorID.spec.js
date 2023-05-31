import jest from 'jest-mock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import buscarReceitasPorID from './buscarReceitasPorID';
import buscarReceitasPorIDMock from './mocks/buscarReceitasPorID';

describe('Testando controller /receitas/id/', () => {

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
        id: 9266,
        original: "pineapples",
        originalName: "pineapples",
        name: "pineapples",
        amount: 1,
        unit: "",
        unitShort: "",
        unitLong: "",
        possibleUnits: [],
        estimatedCost: {
          value: 299,
          unit: "US Cents"
        },
        consistency: "solid",
        shoppingListUnits: [
          "pieces"
        ],
        aisle: "Produce",
        image: "pineapple.jpg",
        meta: [],
        nutrition: {
          nutrients: [],
          properties: [],
          flavonoids: [
            {
              name: "Cyanidin",
              amount: 0,
              unit: "mg"
            }
          ],
          caloricBreakdown: {
            percentProtein: 3.88,
            percentFat: 1.94,
            percentCarbs: 94.18
          },
          weightPerServing: {
            amount: 905,
            unit: "g"
          }
        },
        categoryPath: [
          "tropical fruit",
          "fruit"
        ]
      },
      headers: {
        'x-api-quota-request': '10',
        'x-api-quota-used': '10',
        'x-api-quota-left': '140',
      }
    };
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