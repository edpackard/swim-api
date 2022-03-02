import Database from "../data/Database"
import { Swim } from "../models/SwimModel";
import ValidityCheckers from "../utils/ValidityChecker";

class SwimController {

  database: Database;
  validityCheck: ValidityCheckers;

  constructor (db: Database, validity: ValidityCheckers) {
    this.database = db
    this.validityCheck = validity
  }

  createSwim(lengths: number, pool: string, date: Date) {
    const allSwims = this.getAllSwims()
    let id
    if (allSwims.length > 0 ) {
      id = (allSwims[allSwims.length-1].id) + 1
    } else {
      id = 1
    }
    //const id = this.getAllSwims().length + 1
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

  updateSwim(id: number, lengths: number, pool: string, date: Date) {
    const updatedSwim: Swim = { id, lengths, pool, date }
    if (this.validityCheck.isSwimValid(updatedSwim)) {
      this.database.updateData(updatedSwim)
    } else {
      throw 'Error: cannot update with invalid parameters'
    }
  }

}

export default SwimController
