import { Router } from "express"
import SwimController from "../controllers/SwimController"
import SwimData from "../data/SwimData";

const swimController = new SwimController(new SwimData)
const swimRouter = Router();

swimRouter.get('/', (_, res) => {
  const allSwims = swimController.getAllSwims()
  res.status(200).json(allSwims)
})

swimRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const swim = swimController.getSwim(id)
  res.status(200).json(swim)
  //TODO: handle if id doesn't exist
})

swimRouter.post('/', (req, res) => {
  const lengths = req.body.lengths
  const pool = req.body.pool
  const date = req.body.date
  swimController.createSwim(lengths, pool, date)
  res.status(201).end()
})

swimRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  // call delete swim controller here
  res.status(200).end()
  //TODO: handle if id doesn't exist
})

export default swimRouter