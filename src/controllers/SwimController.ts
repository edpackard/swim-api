import Database from "../data/Database"
import { Swim } from "../models/SwimModel";

class SwimController {

  database: Database;

  constructor (db: Database) {
    this.database = db
  }

  createSwim(lengths: number, pool: string, date: Date) {
    const id = this.getAllSwims().length + 1
    const newSwim: Swim = {id, lengths, pool, date}
    this.database.saveData(newSwim)
  }

  deleteSwim(id: number) {
    this.database.deleteData(id)
  }

  getSwim(id: number): Swim {
    return this.database.getData(id)
  }

  getAllSwims(): Array<Swim> {
    return this.database.getAllData()
  }

  updateSwim(id: number, lengths: number, pool: string, date: Date) {
    const swim: Swim = { id, lengths, pool, date }
    this.database.updateData(swim)
  }
}

export default SwimController
