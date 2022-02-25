class Database {
  
  data: Array<any>
  
  constructor() {
    this.data = []
  }

  getAllData (): Array<any> {
    return this.data
  }

  getData (id: number): any {
    return this.data[id - 1]
  }

  saveData (newData: any) {
    this.data.push(newData)
  }

  deleteData (id: number) {
    this.data = this.data.filter ( item => item.id !== id) 
  }

}

export default Database