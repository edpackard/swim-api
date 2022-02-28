class Database {
  
  data: Array<any>
  
  constructor() {
    this.data = []
  }

  getAllData (): Array<any> {
    return this.data
  }

  getData (id: number): any {
    const retrievedData = this.data[id - 1]
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
    this.data = this.data.filter (item => item.id !== id) 
  }

  updateData (updatedData: any) {
    const dataIndex = this.data.findIndex( data => data.id === updatedData.id)
    this.data[dataIndex] = updatedData
  }

}

export default Database