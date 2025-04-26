import Express from "express"
import { routes } from "../routes"

const app = Express()

const cors = require("cors")

app.use(Express.json())
app.use(cors())

app.use(routes)

app.get("/", (req, res) => {
  res.json({ msg: "This is cors-enabled for all origins!" })
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
