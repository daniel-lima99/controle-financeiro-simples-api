import { prisma } from "../utils/prisma"
import { Prisma } from "../../generated/prisma"
import { categoriasPermitidas } from "../utils/Categorias"

interface TransacaoProps {
  tipo: string
  valor: number
  descricao: string
  categoria: string //PRECISO SABER O QUE É CATEGORIA
}

export class TransacaoService {
  async execute({ tipo, valor, descricao, categoria }: TransacaoProps) {
    if (!tipo || !valor || !descricao || !categoria)
      throw new Error("Preencha todos os campos!")

    if (valor <= 0) throw new Error("Valor deve ser maior que zero!")

    if (tipo !== "entrada" && tipo !== "saida")
      throw new Error("Tipo deve ser entrada ou saida!")

    if (!categoriasPermitidas.includes(categoria)) {
      throw new Error("Categoria inválida")
    }

    const saldoAtual = await prisma.saldo.findUnique({
      where: {
        id: 1,
      },
    })
    const valorDecimal = new Prisma.Decimal(valor)

    const novoSaldo =
      tipo === "entrada"
        ? saldoAtual!.valor.add(valorDecimal)
        : saldoAtual!.valor.sub(valorDecimal)

    const [transacao] = await prisma.$transaction([
      prisma.transacao.create({
        data: {
          tipo,
          valor: valorDecimal,
          descricao,
          categoria,
        },
      }),
      prisma.saldo.update({
        where: {
          id: 1,
        },
        data: {
          valor: novoSaldo,
        },
      }),
    ])

    return transacao
  }
}
