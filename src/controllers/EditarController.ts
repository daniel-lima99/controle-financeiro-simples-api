import { Request, Response } from "express"
import { EditarService } from "../services/EditarService"

export class EditarController {
  async handle(req: Request, res: Response) {
    try {
      const { id, tipo, valor, descricao, categoria } = req.body as {
        id: number
        tipo: string
        valor: number
        descricao: string
        categoria: string
      }

      const editarService = new EditarService()
      const editar = editarService.execute({
        id,
        tipo,
        valor,
        descricao,
        categoria,
      })
      return res.status(200).json(editar)
    } catch (err: any) {
      res.status(400).json(err.message)
    }
  }
}
