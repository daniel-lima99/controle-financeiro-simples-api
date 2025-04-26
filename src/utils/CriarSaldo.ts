import { prisma } from "./prisma"

async function main() {
  const jaExiste = await prisma.saldo.findUnique({ where: { id: 1 } })
  if (!jaExiste) {
    await prisma.saldo.create({
      data: { valor: 0 },
    })
    console.log("Saldo criado com sucesso.")
  } else {
    console.log("Saldo já existe.")
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
