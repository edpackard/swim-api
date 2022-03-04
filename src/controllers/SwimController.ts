import Database from "../data/Database"
import { Swim } from "../models/SwimModel";
import ValidityCheckers from "../utils/ValidityChecker";

//TODO: extract ID generation to DB class

class SwimController {

  database: Database;
  validityCheck: ValidityCheckers;

  constructor (db: Database, validity: ValidityCheckers) {
    this.database = db
    this.validityCheck = validity
  }

  createSwim(lengths: number, pool: string, date: string) {
    const id = this._generateId()
    const newSwim = {id, lengths, pool, date}
    if (this.validityCheck.isSwimValid(newSwim)) {
      this.database.saveData(newSwim)
    } else {
      throw 'Error: not a swim object'
    }
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

  updateSwim(id: number, lengths: number, pool: string, date: string) {
    const updatedSwim: Swim = { id, lengths, pool, date }
    if (this.validityCheck.isSwimValid(updatedSwim)) {
      this.database.updateData(updatedSwim)
    } else {
      throw 'Error: cannot update with invalid parameters'
    }
  }

  _generateId(): number {
    const lastItem = this.database.getLatestItem()
    return lastItem ? lastItem.id + 1 : 1 
  }

}

export default SwimController
