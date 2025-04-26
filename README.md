# API Controle Financeiro Simples
API de controle financeiro em Typescript e Node.js.

## Status
:construction: Em andamento :construction:

## Tecnologias utilizadas
- Node.js
- TypeScript
- Express
- Prisma

## Setup
```bash
# clonar repositório
git clone https://github.com/daniel-lima99/financeiro-simples

# Editar o link para o banco de dados no arquivo .env com os parâmetros condizentes com seu PostgreSQL:
DATABASE_URL="postgresql://postgres:wesleysafadao@localhost:5432/financeiro-simples?schema=public"

# Faça a migração do schema prisma:
npx prisma migrate dev --name init

# Execute o script para criação do item "saldo" no banco de dados:
npm run saldo

# Por fim, execute o código utilizando:
npm run dev

# O servidor iniciará na porta 3000.
```
