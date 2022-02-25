import Database from "../data/Database"

class SwimController {

  database: Database;

  constructor (db: Database) {
    this.database = db
  }

  createSwim(lengths: number, pool: string, date: Date) {
    const id = this.getAllSwims().length + 1
    //TODO: test to ensure only a swim object is passed to db
    this.database.saveData({id, lengths, pool, date})
  }

  deleteSwim(id: number) {
    this.database.deleteData(id)
  }

  getSwim(id: number) {
    return this.database.getData(id)
  }

  getAllSwims(): Array<any> {
    return this.database.getAllData()
  }

  updateSwim(id: number, lengths: number, pool: string, date: Date) {
    //todo: test to ensure only a swimobject passed to db to be updated
    const swim = { id, lengths, pool, date }
    this.database.updateData(swim)

  }
}

export default SwimController
