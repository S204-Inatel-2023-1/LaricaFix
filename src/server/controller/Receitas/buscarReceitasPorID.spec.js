import app from '../../app'
import request from 'supertest'

describe('Tentando controller /receitas/id/',  ()=> {
  it('Verificando se o ID recebido é igual ao solicitado', async ()=> {
    const response = await request(app).get('/api/receitas/id').query({id:716429}).send()
    expect(response.status).toBe(200)
    const data = JSON.parse(response.res.text)
    expect(data.id).toBe(716429)
  })
})