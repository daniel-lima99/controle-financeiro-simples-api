import { Router } from "express"
import { TransacaoController } from "./controllers/TransacaoController"
import { VerTransacaoController } from "./controllers/VerTransacaoController"
import { VerSaldoController } from "./controllers/VerSaldoController"
import { EditarController } from "./controllers/EditarController"
import { DeletarController } from "./controllers/DeletarController"

export const routes = Router()

routes.get("/", (req, res) => {
  res.send({ ok: true })
})

//SALDO
routes.get("/saldo", async (req, res) => {
  await new VerSaldoController().handle(req, res)
})

//TRANSAÇÃO
routes.post("/transacao", async (req, res) => {
  await new TransacaoController().handle(req, res)
})
routes.get("/transacoes", async (req, res) => {
  await new VerTransacaoController().handle(req, res)
})
routes.post("/editar/:id", async (req, res) => {
  await new EditarController().handle(req, res)
})
routes.delete("/deletar/:id", async (req, res) => {
  await new DeletarController().handle(req, res)
})
