
# # API Controle Financeiro Simples
API de controle financeiro em Typescript e Node.js.

## Status
:construction: Em andamento :construction:

## Setup
```bash

# clonar repositório

git  clone  https://github.com/daniel-lima99/financeiro-simples

  

# Editar o link para o banco de dados no arquivo .env com os parâmetros condizentes com seu PostgreSQL:

DATABASE_URL="postgresql://postgres:wesleysafadao@localhost:5432/financeiro-simples?schema=public"

  

# Faça a migração do schema prisma:

npx  prisma  migrate  dev  --name  init

  

# Execute o script para criação do item "saldo" no banco de dados:

npm  run  saldo

  

# Por fim, execute o código utilizando:

npm  run  dev

  

# O servidor iniciará na porta 3000.
```
## Exemplos de Uso API
Existe um arquivo .json exportado do Postman com os exemplos que eu utilizei. Para facilitar a compreensão, vou especificar pontos que serão importantes.

### Transação
```go
- id: número (usado apenas para editar ou deletar transações)
- tipo: "entrada" ou "saida"
- valor: número ou string (desde que seja possível converter para número no backend)
- descricao: string
- categoria: "Alimentação", "Lazer", "Despesas", "Investimentos", "Salário" ou "Freelances"

```

### Ver Saldo e Ver Transações
Não precisam de nenhum parâmetro, porém é necessário mandar pelo menos um JSON vazio para "Ver Transações", que vai abrir a primeira página, ordenada de por data de forma decrescente, para mais páginas e filtros veja abaixo.

### Filtros e Paginação
```go
- pagina: número
- tipo: "entrada" ou "saida" (opcional)
- classificação: "data" ou "valor"
- ordenação: "asc" ou "desc"

```
