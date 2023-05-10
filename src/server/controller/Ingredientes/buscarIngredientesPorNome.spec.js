import app from '../../app'
import request from 'supertest'

describe('Testando controller /ingredientes/nome/',  ()=> {
  it('Verificando se o nome do ingrediente recebido é igual ao solicitado', async ()=> {
    const response = await request(app).get('/api/ingredientes/nome').query({nome:'banana', quantidade: 2}).send()
    expect(response.status).toBe(200)
    const data = JSON.parse(response.res.text)
    expect(data.results[0].name).toBe('banana')
  })
})