import { Request, Response } from "express"
import { TransacaoService } from "../services/TransacaoService"

export class TransacaoController {
  async handle(req: Request, res: Response) {
    try {
      const { tipo, valor, descricao, categoria } = req.body as {
        tipo: string
        valor: number
        descricao: string
        categoria: string
      }

      const transacaoService = new TransacaoService()
      const transacao = await transacaoService.execute({
        tipo,
        valor,
        descricao,
        categoria,
      })
      return res.status(201).json(transacao)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
