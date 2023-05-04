import { config } from 'dotenv';
config();

import path from 'path'; // Módulo que trabalha com resolução de caminhos
import express from 'express'; // Módulo que facilita a criação de um servidor
import routes from './routes.js';  // Rotas da nossa aplicação

const app = express(); // Cria o servidor

app.use(express.json());  // Configura o servidor para trabalhar com JSON
app.use('/api', routes);  // Configura o servidor para receber requisições nas rotas desejadas
app.use(express.static('dist/client')); // Configura o servidor para enviar arquivos estáticos presentes na pasta dist/client

/** Fornece todo o frontend através da rota /html */
app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist/client/index.html'));
});

export default app;