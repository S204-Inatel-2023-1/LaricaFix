import jest from 'jest-mock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import buscarReceitas from './buscarReceitas';
import buscarReceitasMock from './mocks/buscarReceitas.js';

describe('Testando controller /receitas/', () => {

  let mock;
  let req;
  let res;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    req = {
      query: {},
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
    
    const respostaEsperada = buscarReceitasMock();

    req.query = {
      // apiKey: '0000000' deixando de enviar a apiKey, logo o parametro req.query.apiKey receberá undefined
      nome: 'pão de batata',
      ingredientes: '',
      dietas: '',
      intolerancias: '',
      offset: 0,
    };

    await buscarReceitas(req, res);

    expect(res.set).toHaveBeenCalledWith('x-api-quota-request', respostaEsperada.headers['x-api-quota-request']+10);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-used', respostaEsperada.headers['x-api-quota-used']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-left', respostaEsperada.headers['x-api-quota-left']);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que ao enviar a apiKey como a string "undefined" o controller envia o mock na resposta e não consulta o spoonacular', async () => {
    const respostaEsperada = buscarReceitasMock();

    req.query = {
      apiKey: 'undefined', // enviando a string "undefined", logo o parametro req.query.apiKey receberá 'undefined'
      nome: 'pão de batata',
      ingredientes: 'pao',
      dietas: 'vegan',
      intolerancias: 'soy',
      offset: '10',
    };

    await buscarReceitas(req, res);

    expect(res.set).toHaveBeenCalledWith('x-api-quota-request', respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-used', respostaEsperada.headers['x-api-quota-used']);
    expect(res.set).toHaveBeenCalledWith('x-api-quota-left', respostaEsperada.headers['x-api-quota-left']);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que ao enviar a apiKey com um valor coerente o controller deve consultar o spoonacular e repassar sua resposta', async () => {

    // Preparando o mock da consulta ao spoonacular
    const apiKey = '000000';
    const nome = 'Pasta';
    const ingredientes = 'lemon';
    const dietas = 'vegan';
    const intolerancias = 'dairy';
    const offset = '10';
    const respostaEsperada = {
      data: {
        results: [
          {
            id: 654936,
            title: "Pasta with Raw Tomato & Lemon Infused Olive Oil",
            image: "https://spoonacular.com/recipeImages/654936-312x231.jpg",
            imageType: "jpg"
          },
        ],
        offset: 10,
        number: 25,
        totalResults: 1
      },
      headers: {
        'x-api-quota-request': '10',
        'x-api-quota-used': '10',
        'x-api-quota-left': '140',
      }
    };
    const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey}&offset=${offset}&number=25&query=${nome}&includeIngredients=${ingredientes}&diet=${dietas}&intolerances=${intolerancias}`;
    mock.onGet(url).reply(200, respostaEsperada.data, respostaEsperada.headers);

    // Realizando a requisição na rota /receitas desta API
    req.query = {
      apiKey,
      nome,
      ingredientes,
      dietas,
      intolerancias,
      offset,
    };

    await buscarReceitas(req, res);

    expect(res.set).toHaveBeenCalledTimes(3);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-request", respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-used", respostaEsperada.headers["x-api-quota-used"]);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-left", respostaEsperada.headers["x-api-quota-left"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando a dinamicidade da rota visto que mesmo sem filtrar a chamada por receita ou ingrediente o spoonacular ainda é chamado corretamente', async () => {

    // Preparando o mock da consulta ao spoonacular
    const apiKey = '000000';
    const respostaEsperada = {
      data: {
        results: [
          {
            id: 654936,
            title: "Pasta with Raw Tomato & Lemon Infused Olive Oil",
            image: "https://spoonacular.com/recipeImages/654936-312x231.jpg",
            imageType: "jpg"
          },
        ],
        offset: 10,
        number: 25,
        totalResults: 1
      },
      headers: {
        'x-api-quota-request': '10',
        'x-api-quota-used': '10',
        'x-api-quota-left': '140',
      }
    };
    const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey}&offset=0&number=25`;
    mock.onGet(url).reply(200, respostaEsperada.data, respostaEsperada.headers);

    // Realizando a requisição na rota /receitas desta API
    req.query = {
      apiKey,
    };

    await buscarReceitas(req, res);

    expect(res.set).toHaveBeenCalledTimes(3);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-request", respostaEsperada.headers['x-api-quota-request']);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-used", respostaEsperada.headers["x-api-quota-used"]);
    expect(res.set).toHaveBeenCalledWith("x-api-quota-left", respostaEsperada.headers["x-api-quota-left"]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(respostaEsperada.data);
  })

  it('Verificando que caso haja um erro na chamada, este deverá ser apresentado no console', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    req.query.apiKey = '00000000';
    const url = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${req.query.apiKey}&offset=0&number=25`;

    mock.onGet(url).reply(500);
    await buscarReceitas(req, res);
    expect(console.error).toHaveBeenCalled();

    mock.onGet(url).reply(404);
    await buscarReceitas(req, res);
    expect(console.error).toHaveBeenCalled();
  });
})
