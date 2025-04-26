import { prisma } from "../utils/prisma"

export class DeletarService {
  async execute(id: number) {
    if (!id) throw new Error("ID inválido!")

    const saldoAtual = await prisma.saldo.findFirst()
    const transacaoAntiga = await prisma.transacao.findUnique({
      where: { id: id },
    })
    let novoSaldo = saldoAtual!.valor.toNumber()
    const valorAntigo = transacaoAntiga!.valor.toNumber()
    transacaoAntiga!.tipo === "entrada"
      ? (novoSaldo -= valorAntigo)
      : (novoSaldo += valorAntigo)

    const deletar = await prisma.$transaction([
      prisma.transacao.delete({
        where: { id: id },
      }),
      prisma.saldo.update({
        where: { id: saldoAtual!.id },
        data: { valor: novoSaldo },
      }),
    ])

    if (!deletar) throw new Error("Transação não encontrada!")
    return "Transação deletada!"
  }
}
