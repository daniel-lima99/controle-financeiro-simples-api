import { prisma } from "../utils/prisma"

interface FiltroTransacao {
  pagina?: number
  tipo?: "entrada" | "saida"
  classificacao?: "data" | "valor"
  ordenacao?: "asc" | "desc"
}

export class VerTransacaoService {
  async execute({
    pagina = 1,
    tipo,
    classificacao = "data",
    ordenacao = "desc",
  }: FiltroTransacao) {
    //^^^^ valores padrão ^^^^

    const paginacao = 10

    const where: any = {}
    if (tipo) {
      where.tipo = tipo
    }

    const [transacoes, total] = await prisma.$transaction([
      prisma.transacao.findMany({
        where,
        orderBy: {
          [classificacao]: ordenacao,
        },
        skip: (pagina - 1) * paginacao,
        take: paginacao,
      }),
      prisma.transacao.count({ where }),
    ])

    return {
      transacoes,
      paginaAtual: pagina,
      totalPaginas: Math.ceil(total / paginacao),
    }
  }
}
//pagina e paginacao são variaveis que definem a paginação, ou seja, quantas transações serão exibidas por vez e qual pagina será exibida.
// O valor de pagina é 1, o que significa que a primeira página será exibida.
// O valor de paginacao é 10, o que significa que 10 transações serão exibidas por vez.
//pagina -1 define que a paginação começa do zero, ou seja, a primeira página será exibida quando o valor de pagina for 1.
//Sem essa tratativa a paginação começaria do 1, ou seja, a primeira página seria exibida quando o valor de pagina fosse 2 e assim pularia a primeira página.

//========================================================================================

// const [transacoes, total] = await prisma.$transaction([
//   prisma.transacao.findMany({
//     skip: (pagina - 1) * paginacao,
//     take: paginacao,
//     orderBy: {
//       data: "desc",
//     },
//   }),
//   prisma.transacao.count(),
// ])
