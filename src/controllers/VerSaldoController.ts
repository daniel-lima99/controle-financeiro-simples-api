import { Request, Response } from "express"
import { VerSaldoService } from "../services/VerSaldoService"

export class VerSaldoController {
  async handle(req: Request, res: Response) {
    try {
      const verSaldoService = new VerSaldoService()
      const saldo = await verSaldoService.execute()
      return res.status(200).json(saldo)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
