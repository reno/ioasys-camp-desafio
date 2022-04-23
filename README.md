# tamojunto
Desafio final do ioasys camp 2022.


<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1ECVwcHPgr7QHrgEQ8ZtxJ800uDl7a9GS"/>
</p>

## ⚙️  Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [TypeORM](typeorm.io)
- [JWT](https://jwt.io/)

## 🚀 Uso

- Clone o repositório
- Inclua as variáveis de ambiente necessárias.
- Execute `yarn install` para instalar as dependências.
- Execute `yarn db:migrate` para criar ou atualizar as tabelas do banco de dados. 
- Execute `yarn db:seed:run` para popular o banco de dados.
- Rode o `yarn start` para iniciar a aplicação.

A aplicação estará disponível em `http://localhost:3000`

A documentação das rotas esterá disponível em `http://localhost:3000/docs`

### Variáveis de ambiente
As seguintes variáveis de ambiente são necessárias para a aplicação:
```
NODE_ENV
PORT
JWT_SECRET
EXPIRES_IN
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
DATABASE_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_PUBLIC_BUCKET_NAME
EMAIL_SERVICE
EMAIL_USER
EMAIL_PASSWORD
EMAIL_CONNECTION_STRING
```

### Credenciais de acesso
As credenciais dos usuários de teste são:
 
- email: `camp@ioasys.com.br`
- password: `Camp@123`
