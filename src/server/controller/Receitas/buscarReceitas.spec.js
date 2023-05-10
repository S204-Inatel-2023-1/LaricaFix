import app from '../../app'
import request from 'supertest'

describe('Testando controller /receitas/',  ()=> {
  it('Verificando sucesso na requisição/receita', async ()=> {
    const response = await request(app).get('/api/receitas').send()
    expect(response.status).toBe(200)
    const data = JSON.parse(response.res.text)
    expect(data.response.length).toBe(100)
  })
})