class Database {
  
  data: Array<any>
  
  constructor() {
    this.data = []
  }

  getAllData (): Array<any> {
    return this.data
  }

  getData (id: number): any {
    const retrievedData = this._getObjectById(id)
    if (retrievedData) {
      return retrievedData
    } else {
      throw 'ID not found'
    }
  }

  saveData (newData: any) {
    this.data.push(newData)
  }

  deleteData (id: number) {
    if (this._getObjectById(id)) {
      this.data = this.data.filter (item => item.id !== id)
    } else {
      throw 'ID not found'
    }
  }

  updateData (updatedData: any) {
    const dataIndex = this.data.findIndex( data => data.id === updatedData.id)
    this.data[dataIndex] = updatedData
  }

  _getObjectById (id: number) {
    return this.data[id - 1]
  }
}

export default Database