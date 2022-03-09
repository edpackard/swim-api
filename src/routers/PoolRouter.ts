import { Router } from 'express'
import PoolController from "../controllers/PoolController";
import Database from '../data/Database';

class PoolRouter {

  private router: Router
  private poolController: PoolController

  constructor (controller = new PoolController(new Database)) {
    this.poolController = controller
    this.router = Router();
    this.setUpRouter()
  }

  private setUpRouter () {
    this.router.get('/', (req, res) => {
      this.poolController.getAllPools(req, res)
      res.end()
    })

    this.router.get('/:id', (req, res) => {
      this.poolController.getPool(req, res)
      res.end()
    })

    this.router.post('/', (req, res) => {
      this.poolController.createPool(req, res)
      res.end()
    })
  }

  getRouter() {
    return this.router
  }

}

export default PoolRouter
