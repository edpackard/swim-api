import * as database from "../data/swimData"

class swimController {
  createSwim(lengths: number, pool: string, date: Date) {
    database.saveData({lengths, pool, date})
  }

  getAllSwims(): Array<any> {
    return database.getData()
  }
}

export default new swimController
