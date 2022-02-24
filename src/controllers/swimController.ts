import * as database from "../data/swimData"

class swimController {
  createSwim(lengths: number, pool: string, date: Date) {
    const id = this.getAllSwims().length + 1
    database.saveData({id, lengths, pool, date})
  }

  getAllSwims(): Array<any> {
    return database.getData()
  }
}

export default new swimController
