import * as database from "../data/swimData"

class swimController {
  static createSwim(lengths: number, pool: string, date: Date) {
    database.saveData({lengths, pool, date})
  }

  static getAllSwims(): Array<any> {
    return database.getData()
  }
}

export default swimController
