import { Router } from "express"
import SwimController from "../controllers/SwimController"
import Database from "../data/Database";
import ValidityChecker from "../utils/ValidityChecker";

class SwimRouter {

  private router: Router;
  private swimController: SwimController

constructor(controller = new SwimController(new Database, new ValidityChecker) ) {
  this.swimController = controller
  this.router = Router();
  this.setUpRouter()
}

private setUpRouter() {
  this.router.get('/', (_, res) => {
  try {
    const allSwims = this.swimController.getAllSwims()
    res.status(200).json(allSwims)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message})
    }
    }
  })

  this.router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const swim = this.swimController.getSwim(id)
      res.status(200).json(swim)
    } catch (error) {
      return res.status(404).json({ message: error})
    }
  })

  this.router.post('/', (req, res) => {
    const lengths = req.body.lengths
    const pool = req.body.pool
    const date = req.body.date
    try {
      this.swimController.createSwim(lengths, pool, date)
      res.status(201).end()
    } catch (error) {
      return res.status(400).json({ message: error})
    }
  })

  this.router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const lengths = req.body.lengths
    const pool =  req.body.pool
    const date = req.body.date
    this.swimController.updateSwim(id, lengths, pool, date)
    res.status(204).end()
  })

  this.router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    this.swimController.deleteSwim(id)
    res.status(204).end()
    //TODO: handle if id doesn't exist
  })
}

  getRouter() {
    return this.router
  }
}

export default SwimRouter