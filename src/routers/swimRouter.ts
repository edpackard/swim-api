import { Router } from "express"
import SwimController from "../controllers/SwimController"
import Database from "../data/Database";

const swimController = new SwimController(new Database)
const swimRouter = Router();

swimRouter.get('/', (_, res) => {
  const allSwims = swimController.getAllSwims()
  res.status(200).json(allSwims)
})

swimRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const swim = swimController.getSwim(id)
    res.status(200).json(swim)
  } catch (error) {
    return res.status(404).json({ message: error})
  }
})

swimRouter.post('/', (req, res) => {
  const lengths = req.body.lengths
  const pool = req.body.pool
  const date = req.body.date
  swimController.createSwim(lengths, pool, date)
  res.status(201).end()
})

swimRouter.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const lengths = req.body.lengths
  const pool =  req.body.pool
  const date = req.body.date
  swimController.updateSwim(id, lengths, pool, date)
  res.status(204).end()
})

swimRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  swimController.deleteSwim(id)
  res.status(204).end()
  //TODO: handle if id doesn't exist
})

export default swimRouter