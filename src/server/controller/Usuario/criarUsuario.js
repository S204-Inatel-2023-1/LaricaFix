import User from './models/usuario.js'

export default async function (req, res) {
  const {nome, email, senha} = req.body;
  
  try {
    const userExists = await User.findOne({email})

    if (userExists){
      return res.status(400).json({
        error: 'Usuário já existe!',
      })
    }

    const user = await User.create({
      nome,
      email,
      senha
    })

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      error: 'Falha na criação de usuário',
      message: error
    })
  }
}