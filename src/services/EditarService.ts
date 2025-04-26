import { prisma } from "../utils/prisma"
import { categoriasPermitidas } from "../utils/Categorias"

interface EditarProps {
  id: number
  tipo: string
  valor: number
  descricao: string
  categoria: string
}

export class EditarService {
  async execute({ id, tipo, valor, descricao, categoria }: EditarProps) {
    if (!id || !tipo || !valor || !descricao || !categoria)
      throw new Error("Preencha todos os campos!")

    if (valor <= 0) throw new Error("Valor deve ser maior que zero!")

    if (tipo !== "entrada" && tipo !== "saida")
      throw new Error("Tipo deve ser entrada ou saida!")

    if (categoria && !categoriasPermitidas.includes(categoria)) {
      throw new Error("Categoria inválida")
    }

    const transacaoAntiga = await prisma.transacao.findUnique({
      where: {
        id,
      },
    })
    const saldoAtual = await prisma.saldo.findFirst()

    //toNumber() transforma os valores decimais do banco de dados para o formato "number"
    //isso foi necessário para fazer cálculos
    let novoSaldo = saldoAtual!.valor.toNumber()
    const valorAntigo = transacaoAntiga!.valor.toNumber()

    //desfaz a transação antiga, se foi entrada subtrai o valor, se foi saída soma o valor
    transacaoAntiga!.tipo === "entrada"
      ? (novoSaldo -= valorAntigo)
      : (novoSaldo += valorAntigo)

    //se for entrada soma, se for saída subtrai
    tipo === "entrada" ? (novoSaldo += valor) : (novoSaldo -= valor)

    const editar = await prisma.$transaction([
      prisma.transacao.update({
        where: { id },
        data: {
          tipo,
          valor,
          descricao,
          categoria,
        },
      }),
      prisma.saldo.update({
        where: { id: saldoAtual!.id },
        data: { valor: novoSaldo },
      }),
    ])
    return editar
  }
}
