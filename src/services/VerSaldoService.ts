import { prisma } from "../utils/prisma"

export class VerSaldoService {
  async execute() {
    const saldoAtual = await prisma.saldo.findUnique({
      where: {
        id: 1,
      },
    })
    if (!saldoAtual) throw new Error("Saldo não encontrado!")

    return saldoAtual.valor.toNumber()
  }
}
