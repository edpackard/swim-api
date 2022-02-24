import { Router } from "express"
import SwimController from "../controllers/SwimController"
import SwimData from "../data/swimData";

const swimController = new SwimController(new SwimData)
const swimRouter = Router();

swimRouter.get('/', (_, res) => {
  const allSwims = swimController.getAllSwims()
  res.status(200).json(allSwims)
})

swimRouter.post('/', (req, res) => {
  const lengths = req.body.lengths
  const pool = req.body.pool
  const date = req.body.date
  swimController.createSwim(lengths, pool, date)
  res.status(201).end()
})

export default swimRouter