import app from '../../app'
import request from 'supertest'

describe('Testando controller /receitas/',  ()=> {
  it('Verificando que ao deixar de enviar a apiKey o controller envia um mock na resposta', async ()=> {
    const response = await request(app).get('/api/receitas').send()
    expect(response.status).toBe(200)
    const data = JSON.parse(response.res.text)
    expect(data.results.length).toBe(22)
  })
})