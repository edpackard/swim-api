import SwimData from "../data/SwimData"

class SwimController {

  database: SwimData;

  constructor (db: SwimData) {
    this.database = db
  }

  createSwim(lengths: number, pool: string, date: Date) {
    const id = this.getAllSwims().length + 1
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
}

export default SwimController
