import { Swim } from '../models/SwimModel'

class SwimData {
  
  data: Array<Swim>

  constructor() {
    this.data = []
  }

  getAllData (): Array<Swim> {
    return this.data
  }

  getData (id: number): Swim {
    return this.data[id - 1]
  }

  saveData (object: Swim) {
    this.data.push(object)
  }

  deleteData (id: number) {
    this.data = this.data.filter ( item => item.id !== id) 
  }

}

export default SwimData