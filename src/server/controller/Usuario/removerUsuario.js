import usuarios from './database/database.js'

export default async function (req, res) {
  try {
    let {id} = req.body

    const index = usuarios.findIndex(user => user.id == id);
    if(index == -1){
      res.status(404)
      res.json({message:"id inválido"})
      return
    }

    const {senha: _, ...usuarioBuscado} = usuarios[index];

    usuarios.splice(index, 1)
    
    res.status(200)
    res.json(usuarioBuscado)
  } catch (error) {
    console.error(error);
  }
}