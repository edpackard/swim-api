import { Request, Response } from 'express'
import Database from "../data/Database"

class PoolController {

  database: Database; 

  constructor(db: Database) {
    this.database = db    
  }

  getAllPools (req: Request, res: Response) {
    const data = this.database.getAllData()
    res.status(200).json(data)
  }

  createPool (req: Request, res: Response) {
    const name = req.body.name
    const length = req.body.length
    const id = 1
    this.database.saveData({id: id, length: length, name: name})
    res.status(200)
  }

}

export default PoolController