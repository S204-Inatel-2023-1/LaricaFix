import usuarios from './database/database.js'
import { v4 as uuidv4 } from 'uuid';

export default async function (req, res) {
  try {
    let dadosUsuario = req.body
    dadosUsuario.id = uuidv4();
    usuarios.push(dadosUsuario)

    let user = usuarios.filter((user) => user.id == dadosUsuario.id)
    let {senha: _, ...usuarioCriado} = user[0];
    res.status(200)
    res.json(usuarioCriado)
  } catch (error) {
    console.error(error);
  }
}