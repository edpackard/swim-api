import SwimData from "../data/swimData"

class SwimController {

  database: SwimData;

  constructor (db: SwimData) {
    this.database = db
  }

  createSwim(lengths: number, pool: string, date: Date) {
    const id = this.getAllSwims().length + 1
    this.database.saveData({id, lengths, pool, date})
  }

  getSwim(id: number) {
    return this.database.getData(id)
  }

  getAllSwims(): Array<any> {
    return this.database.getAllData()
  }
}

export default SwimController
