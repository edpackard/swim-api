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

}

export default PoolController