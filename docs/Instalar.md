## Instalação
Executar `npm install ` no terminal para instalar as dependências

### Desenvolvimento

Executar `npm run dev` para iniciar tanto o servidor Express quanto a aplicação em React

Ambas as portas podem ser configuradas por variáveis de ambiente

As portas padrões são

- `3000` ou a variável `SERVER_PORT` pro servidor
- `3001` ou a variável `CLIENT_PORT` pro cliente


O cliente se encontra em `/*`<br>
A api se encontra em `/api/*`

### Produção

Executar `npm start`, isso vai traduzir/compilar a aplicação e excutar ambos front e back end na port `3000` ou na porta definida para o servidor.

Ou executar `npm run build` somente para traduzir/compilar a aplicação