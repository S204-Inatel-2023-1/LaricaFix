import app from './app.js';

/* Captura a variável Server_Port das variáveis de ambiente, 
 caso não haja nenhuma variável Server_port, cria uma com o valor 3000 */
const { PORT = 3000 } = process.env; 

/**Esta função cria um processo responsável por receber e enviar requisições HTTP,
 * mesmo sendo chamada apenas uma vez ela fica em execução permanentemente como se fosse um loop
 */
app.listen(PORT, () => {
  console.log(`Servidor LaricaFix em execução e disponível em http://localhost:${SERVER_PORT}`);
});
