import { Router } from "express"
import swimController from "../controllers/swimController"

const swimRouter = Router();

swimRouter.get('/', (_, res) => {
  const allSwims = swimController.getAllSwims()
  res.json(allSwims)
})

swimRouter.post('/', (req, res) => {
  console.log(req.params)
})

export default swimRouter