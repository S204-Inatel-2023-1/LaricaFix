import User from './models/usuario.js'

export default async function (req, res) {
  let {email} = req.query
  
  try {
    const user = await User.findOne({email})

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.json(user)
  } catch (error) {
    return res.status(500).json({
      error: 'Falha na busca por usuário',
      message: error
    })
  }
}