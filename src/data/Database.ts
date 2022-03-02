class Database {
  
  data: Array<any>
  
  constructor() {
    this.data = []
  }

  getAllData (): Array<any> {
    return this.data
  }

  getData (id: number): any {
    const dataIndex = this.data.findIndex(data => data.id === id )
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
    const dataIndex = this.data.findIndex(data => data.id === id)
    if (dataIndex >= 0) {
      this.data = this.data.filter (item => item.id !== id)
    } else {
      throw 'ID not found'
    }
  }

  updateData (updatedData: any) {
    const dataIndex = this.data.findIndex( data => data.id === updatedData.id)
    console.log(updatedData, dataIndex)
    if(dataIndex >= 0) {
      this.data[dataIndex] = updatedData
    } else {
      throw 'ID not found'
    }
  }

  _getObjectById (id: number) {
    return this.data[id - 1]
  }
}

export default Database