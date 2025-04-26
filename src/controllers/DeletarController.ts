import { Request, Response } from "express"
import { DeletarService } from "../services/DeletarService"

export class DeletarController {
  async handle(req: Request, res: Response) {
    try {
      const {id} = req.body as {id: number}

      const deletarService = new DeletarService()
      const deletar = await deletarService.execute(id)
      return res.status(200).json(deletar)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
