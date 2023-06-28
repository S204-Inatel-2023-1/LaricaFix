import usuarios from './database/database.js'

export default async function (req, res) {
  try {
    let {email, senha} = req.query

    let user = usuarios.filter((user) => user.email == email && user.senha == senha)
    if(user.length == 0){
      res.status(404)
      res.json({message:"usuario ou senha inválidos"})
      return
    }
    let {senha: _, ...usuarioBuscado} = user[0];
    
    res.status(200)
    res.json(usuarioBuscado)
  } catch (error) {
    console.error(error);
  }
}