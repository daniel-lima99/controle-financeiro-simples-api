import { Request, Response } from "express"
import { VerTransacaoService } from "../services/VerTransacaoService"

export class VerTransacaoController {
  async handle(req: Request, res: Response) {
    try {
      const { pagina, tipo, classificacao, ordenacao } = req.query as {
        pagina?: number
        tipo?: "entrada" | "saida"
        classificacao?: "data" | "valor"
        ordenacao?: "asc" | "desc"
      }
      const verTransacaoService = new VerTransacaoService()
      const transacoes = await verTransacaoService.execute({
        pagina,
        tipo,
        classificacao,
        ordenacao,
      })
      return res.status(200).json(transacoes)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
