import swimData from "../data/swimData"

class Controller {
  static getAllSwims(): Array<any> {
    return swimData.data()
  }
}

export default Controller
