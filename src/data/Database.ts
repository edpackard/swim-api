class Database {
  
  data: Array<any>
  
  constructor() {
    this.data = []
  }

  getAllData (): Array<any> {
    return this.data
  }

  getData (id: number): any {
    const dataIndex = this._getObjectIndex(id)
    if (dataIndex >= 0 ) {
      return this.data[dataIndex]
    } else {
      throw 'ID not found'
    }
  }

  saveData (newData: any) {
    this.data.push(newData)
  }

  deleteData (id: number) {
    const dataIndex = this._getObjectIndex(id)
    if (dataIndex >= 0) {
      this.data = this.data.filter (item => item.id !== id)
    } else {
      throw 'ID not found'
    }
  }

  updateData (updatedData: any) {
    const dataIndex = this._getObjectIndex(updatedData.id)
    if(dataIndex >= 0) {
      this.data[dataIndex] = updatedData
    } else {
      throw 'ID not found'
    }
  }

  _getObjectIndex (id: number): number {
    return this.data.findIndex(data => data.id === id)
  }
}

export default Database